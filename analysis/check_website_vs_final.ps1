Set-Location 'c:\Users\Yash Jangid\Desktop\Table'
$csvRows = Import-Csv 'analysis/final_institutes_abroad_standardized_corrected_v2.csv'
$jsonRows = Get-Content 'data/institutes.json' -Raw | ConvertFrom-Json

function NName([string]$s){
  if([string]::IsNullOrWhiteSpace($s)){return ''}
  $x=$s.Trim().ToLowerInvariant()
  $x=[regex]::Replace($x,'&',' and ')
  $x=[regex]::Replace($x,'[^a-z0-9\s]',' ')
  $x=[regex]::Replace($x,'\s+',' ').Trim()
  return $x
}
function NCountry([string]$s){
  if([string]::IsNullOrWhiteSpace($s)){return ''}
  $x=$s.Trim().ToLowerInvariant()
  $x=[regex]::Replace($x,'\s+',' ').Trim()
  switch($x){
    'usa'{'united states of america';break}
    'us'{'united states of america';break}
    'u s a'{'united states of america';break}
    'uk'{'united kingdom';break}
    'u k'{'united kingdom';break}
    'england'{'united kingdom';break}
    default{$x}
  }
}

$csvMap = @{}
foreach($r in $csvRows){
  $un = NName $r.University
  $cn = NCountry $r.'Country / Main Campus'
  if(-not $csvMap.ContainsKey($un)){ $csvMap[$un] = New-Object System.Collections.Generic.HashSet[string] }
  [void]$csvMap[$un].Add($cn)
}

$jsonMap = @{}
foreach($r in $jsonRows){
  $un = NName $r.university
  $cn = NCountry $r.country
  if(-not $jsonMap.ContainsKey($un)){ $jsonMap[$un] = New-Object System.Collections.Generic.HashSet[string] }
  [void]$jsonMap[$un].Add($cn)
}

$mismatches = @()
$allKeys = @($csvMap.Keys + $jsonMap.Keys | Sort-Object -Unique)
foreach($k in $allKeys){
  $csvCountries = if($csvMap.ContainsKey($k)){ @($csvMap[$k]) } else { @() }
  $jsonCountries = if($jsonMap.ContainsKey($k)){ @($jsonMap[$k]) } else { @() }
  $csvSet = ($csvCountries | Sort-Object) -join ' | '
  $jsonSet = ($jsonCountries | Sort-Object) -join ' | '
  if($csvSet -ne $jsonSet){
    $mismatches += [PSCustomObject]@{
      UniversityNorm=$k
      CsvCountries=$csvSet
      WebsiteCountries=$jsonSet
      CsvExists=($csvMap.ContainsKey($k))
      WebsiteExists=($jsonMap.ContainsKey($k))
    }
  }
}

$out='analysis/website_vs_final_country_mismatches.csv'
$mismatches | Sort-Object UniversityNorm | Export-Csv -Path $out -NoTypeInformation -Encoding UTF8
$summary=[PSCustomObject]@{
  CsvRows=$csvRows.Count
  WebsiteRows=$jsonRows.Count
  CsvInstitutes=$csvMap.Keys.Count
  WebsiteInstitutes=$jsonMap.Keys.Count
  MismatchInstitutes=$mismatches.Count
}
$summary | Export-Csv -Path 'analysis/website_vs_final_country_mismatch_summary.csv' -NoTypeInformation -Encoding UTF8
Write-Output ('SUMMARY=' + ($summary | ConvertTo-Json -Compress))
Write-Output ('MISMATCH_FILE=' + (Resolve-Path $out))
