$src = 'c:\Users\Yash Jangid\Desktop\Loan data matrix  for website - institutes-abroad-standardized Co-pilot.csv'
if (-not (Test-Path $src)) { throw "CSV not found: $src" }
$outDir = 'analysis'; if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
$rows = Import-Csv -Path $src

function Normalize-Name([string]$s) {
  if ([string]::IsNullOrWhiteSpace($s)) { return '' }
  $x = $s.Trim().ToLowerInvariant()
  $x = [regex]::Replace($x, '&', ' and ')
  $x = [regex]::Replace($x, '[^a-z0-9\s]', ' ')
  $x = [regex]::Replace($x, '\s+', ' ').Trim()
  return $x
}
function Normalize-Country([string]$s) {
  if ([string]::IsNullOrWhiteSpace($s)) { return '' }
  $x = $s.Trim().ToLowerInvariant()
  $x = [regex]::Replace($x, '\s+', ' ').Trim()
  switch ($x) {
    'usa' { 'united states of america'; break }
    'us' { 'united states of america'; break }
    'u s a' { 'united states of america'; break }
    'uk' { 'united kingdom'; break }
    'u k' { 'united kingdom'; break }
    'england' { 'united kingdom'; break }
    default { $x }
  }
}
function To-Title([string]$s) {
  if ([string]::IsNullOrWhiteSpace($s)) { return '' }
  $ti = (Get-Culture).TextInfo
  return $ti.ToTitleCase($s.ToLowerInvariant())
}

$enriched = foreach ($i in 0..($rows.Count-1)) {
  $r = $rows[$i]
  [PSCustomObject]@{
    RowNumber = $i + 2
    Lender = $r.'Lender name'
    University = $r.University
    UniversityNorm = Normalize-Name $r.University
    Country = $r.'Country / Main Campus'
    CountryNorm = Normalize-Country $r.'Country / Main Campus'
    Criteria = $r.Criteria
    Source = $r.Source
    Courses = $r.Courses
  }
}

$nameCanon = @{}
$nameMapRows = @()
foreach ($g in ($enriched | Group-Object UniversityNorm)) {
  $variants = $g.Group | Group-Object University | Sort-Object -Property @{Expression='Count';Descending=$true}, @{Expression={$_.Name.Length};Ascending=$true}, @{Expression='Name';Ascending=$true}
  $canonical = if ($variants.Count -gt 0) { $variants[0].Name } else { '' }
  $nameCanon[$g.Name] = $canonical
  $nameMapRows += [PSCustomObject]@{
    UniversityNorm = $g.Name
    CanonicalUniversity = $canonical
    VariantsCount = $variants.Count
    TotalRows = $g.Count
    Variants = (($variants | ForEach-Object { "{0}:{1}" -f $_.Name,$_.Count }) -join ' || ')
  }
}

$countryCanon = @{}
$countryMeta = @{}
$countryFixRows = @()
foreach ($g in ($enriched | Group-Object UniversityNorm)) {
  $countries = $g.Group | Group-Object CountryNorm | Where-Object { -not [string]::IsNullOrWhiteSpace($_.Name) } | Sort-Object -Property @{Expression='Count';Descending=$true}, @{Expression='Name';Ascending=$true}
  if ($countries.Count -eq 0) { continue }
  $top = $countries[0]
  $second = if ($countries.Count -gt 1) { $countries[1].Count } else { 0 }
  $confidence = if ($countries.Count -eq 1) { 'high' } elseif ($top.Count -ge 3 -and $second -le 1) { 'high' } elseif ($top.Count -ge 2 -and $top.Count -gt $second) { 'medium' } else { 'low' }
  $countryCanon[$g.Name] = $top.Name
  $countryMeta[$g.Name] = [PSCustomObject]@{
    DistinctCountries = $countries.Count
    MajorityCountryNorm = $top.Name
    MajorityCount = $top.Count
    SecondCount = $second
    Confidence = $confidence
    Breakdown = (($countries | ForEach-Object { "{0}:{1}" -f $_.Name,$_.Count }) -join ' || ')
  }
  foreach ($row in $g.Group) {
    if ($row.CountryNorm -ne $top.Name) {
      $countryFixRows += [PSCustomObject]@{
        RowNumber = $row.RowNumber
        Lender = $row.Lender
        University = $row.University
        UniversityNorm = $row.UniversityNorm
        CurrentCountry = $row.Country
        CurrentCountryNorm = $row.CountryNorm
        ProposedCountryNorm = $top.Name
        Confidence = $confidence
        MajorityCount = $top.Count
        SecondCount = $second
        Breakdown = (($countries | ForEach-Object { "{0}:{1}" -f $_.Name,$_.Count }) -join ' || ')
        Criteria = $row.Criteria
        Source = $row.Source
      }
    }
  }
}

$proposed = foreach ($i in 0..($rows.Count-1)) {
  $r = $rows[$i]
  $rowNum = $i + 2
  $uNorm = Normalize-Name $r.University
  $cNorm = Normalize-Country $r.'Country / Main Campus'
  $canonUni = if ($nameCanon.ContainsKey($uNorm)) { $nameCanon[$uNorm] } else { $r.University }
  $canonCountryNorm = if ($countryCanon.ContainsKey($uNorm)) { $countryCanon[$uNorm] } else { $cNorm }
  $meta = if ($countryMeta.ContainsKey($uNorm)) { $countryMeta[$uNorm] } else { $null }

  $proposedCountry = if ([string]::IsNullOrWhiteSpace($canonCountryNorm)) { $r.'Country / Main Campus' } else { To-Title $canonCountryNorm }
  if ($canonCountryNorm -eq 'united states of america') { $proposedCountry = 'United States of America' }
  if ($canonCountryNorm -eq 'united kingdom') { $proposedCountry = 'United Kingdom' }

  $changedUni = ($r.University -ne $canonUni)
  $changedCountry = ($cNorm -ne $canonCountryNorm)

  [PSCustomObject]@{
    'Lender name' = $r.'Lender name'
    University = $canonUni
    'Country / Main Campus' = $proposedCountry
    Criteria = $r.Criteria
    Source = $r.Source
    Courses = $r.Courses
    _RowNumber = $rowNum
    _UniversityOriginal = $r.University
    _CountryOriginal = $r.'Country / Main Campus'
    _UniversityNorm = $uNorm
    _CountryNormOriginal = $cNorm
    _CountryNormProposed = $canonCountryNorm
    _ChangedUniversity = $changedUni
    _ChangedCountry = $changedCountry
    _CountryConfidence = if ($meta) { $meta.Confidence } else { 'high' }
    _CountryBreakdown = if ($meta) { $meta.Breakdown } else { '' }
  }
}

$nameMapRows | Sort-Object VariantsCount,TotalRows -Descending | Export-Csv -Path (Join-Path $outDir 'proposal_name_canonical_map.csv') -NoTypeInformation -Encoding UTF8
$countryFixRows | Sort-Object RowNumber | Export-Csv -Path (Join-Path $outDir 'proposal_country_row_fixes.csv') -NoTypeInformation -Encoding UTF8
$proposed | Export-Csv -Path (Join-Path $outDir 'proposal_institutes_abroad_standardized_corrected.csv') -NoTypeInformation -Encoding UTF8

$changeSummary = [PSCustomObject]@{
  TotalRows = $proposed.Count
  NameChanges = (($proposed | Where-Object { $_._ChangedUniversity -eq $true }).Count)
  CountryChanges = (($proposed | Where-Object { $_._ChangedCountry -eq $true }).Count)
  CountryFixHigh = (($countryFixRows | Where-Object { $_.Confidence -eq 'high' }).Count)
  CountryFixMedium = (($countryFixRows | Where-Object { $_.Confidence -eq 'medium' }).Count)
  CountryFixLow = (($countryFixRows | Where-Object { $_.Confidence -eq 'low' }).Count)
}
$changeSummary | Export-Csv -Path (Join-Path $outDir 'proposal_change_summary.csv') -NoTypeInformation -Encoding UTF8
Write-Output ('OUT_DIR=' + (Resolve-Path $outDir))
Write-Output ('SUMMARY=' + ($changeSummary | ConvertTo-Json -Compress))
