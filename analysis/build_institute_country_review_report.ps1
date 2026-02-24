Set-Location 'c:\Users\Yash Jangid\Desktop\Table'

$website = Get-Content 'data/institutes.json' -Raw | ConvertFrom-Json
$final = Import-Csv 'analysis/final_institutes_abroad_standardized_corrected_v3.csv'

function NName([string]$s){
  if([string]::IsNullOrWhiteSpace($s)){ return '' }
  $x = $s.Trim().ToLowerInvariant()
  $x = [regex]::Replace($x, '&', ' and ')
  $x = [regex]::Replace($x, '[^a-z0-9\s]', ' ')
  $x = [regex]::Replace($x, '\s+', ' ').Trim()
  return $x
}

function NCountry([string]$s){
  if([string]::IsNullOrWhiteSpace($s)){ return '' }
  $x = $s.Trim().ToLowerInvariant()
  $x = [regex]::Replace($x, '\s+', ' ').Trim()
  switch($x){
    'usa' { 'united states of america'; break }
    'us' { 'united states of america'; break }
    'u s a' { 'united states of america'; break }
    'uk' { 'united kingdom'; break }
    'u k' { 'united kingdom'; break }
    'england' { 'united kingdom'; break }
    default { $x }
  }
}

function PrettyCountry([string]$s){
  if([string]::IsNullOrWhiteSpace($s)){ return '' }
  $ti = (Get-Culture).TextInfo
  $p = $ti.ToTitleCase($s.ToLowerInvariant())
  if($s -eq 'united states of america'){ return 'United States of America' }
  if($s -eq 'united kingdom'){ return 'United Kingdom' }
  return $p
}

$webMap = @{}
$webDisplay = @{}
foreach($r in $website){
  $k = NName $r.university
  if(-not $webMap.ContainsKey($k)){ $webMap[$k] = New-Object System.Collections.Generic.HashSet[string] }
  [void]$webMap[$k].Add((NCountry $r.country))
  if(-not $webDisplay.ContainsKey($k)){ $webDisplay[$k] = New-Object System.Collections.Generic.HashSet[string] }
  [void]$webDisplay[$k].Add([string]$r.university)
}

$finalMap = @{}
$finalDisplay = @{}
foreach($r in $final){
  $k = NName $r.University
  if(-not $finalMap.ContainsKey($k)){ $finalMap[$k] = New-Object System.Collections.Generic.HashSet[string] }
  [void]$finalMap[$k].Add((NCountry $r.'Country / Main Campus'))
  if(-not $finalDisplay.ContainsKey($k)){ $finalDisplay[$k] = [string]$r.University }
}

$allKeys = @($webMap.Keys + $finalMap.Keys | Sort-Object -Unique)
$report = foreach($k in $allKeys){
  $webCountries = if($webMap.ContainsKey($k)){ @($webMap[$k] | Where-Object { $_ -ne '' } | Sort-Object -Unique) } else { @() }
  $finalCountries = if($finalMap.ContainsKey($k)){ @($finalMap[$k] | Where-Object { $_ -ne '' } | Sort-Object -Unique) } else { @() }

  $websiteCountryRaw = ($webCountries | ForEach-Object { PrettyCountry $_ }) -join ' | '
  $suggestedRaw = ($finalCountries | ForEach-Object { PrettyCountry $_ }) -join ' | '

  $status = if($websiteCountryRaw -eq $suggestedRaw){ 'Match' } else { 'Review' }

  $displayName = if($finalDisplay.ContainsKey($k)){ $finalDisplay[$k] } elseif($webDisplay.ContainsKey($k)){ (@($webDisplay[$k] | Sort-Object -Unique))[0] } else { $k }

  [PSCustomObject]@{
    Institute = $displayName
    WebsiteCountry = $websiteCountryRaw
    SuggestedCountry_Copilot = $suggestedRaw
    Status = $status
    InstituteKey = $k
    WebsiteCountryCount = $webCountries.Count
    SuggestedCountryCount = $finalCountries.Count
  }
}

$report = $report | Sort-Object Status, Institute

$csvOut = 'analysis/institute_country_review_report.csv'
$xlsxOut = 'analysis/institute_country_review_report.xlsx'
$report | Export-Csv -Path $csvOut -NoTypeInformation -Encoding UTF8

$summary = [PSCustomObject]@{
  TotalInstitutes = $report.Count
  Match = ($report | Where-Object { $_.Status -eq 'Match' }).Count
  Review = ($report | Where-Object { $_.Status -eq 'Review' }).Count
}
$summary | Export-Csv -Path 'analysis/institute_country_review_report_summary.csv' -NoTypeInformation -Encoding UTF8

$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks.Open((Resolve-Path $csvOut).Path)
$xlOpenXMLWorkbook = 51
$wb.SaveAs((Resolve-Path 'analysis').Path + '\\institute_country_review_report.xlsx', $xlOpenXMLWorkbook)
$wb.Close($false)
$excel.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($wb) | Out-Null
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null

Write-Output ('CSV=' + (Resolve-Path $csvOut))
Write-Output ('XLSX=' + (Resolve-Path $xlsxOut))
Write-Output ('SUMMARY=' + ($summary | ConvertTo-Json -Compress))
