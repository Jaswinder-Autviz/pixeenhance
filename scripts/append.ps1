$seoPath = Join-Path $PSScriptRoot "..\src\data\seoLandingPages.ts"
$scrPath = Join-Path $PSScriptRoot "append-more-exam-portals.mjs"

$seo = Get-Content -Path $seoPath -Raw -Encoding UTF8
$scr = Get-Content -Path $scrPath -Raw -Encoding UTF8

if ($seo -match 'gate-photo-resizer') {
    Write-Output "gate-photo-resizer already present in seoLandingPages.ts"
    exit 0
}

$startMarker = 'const NEW_EXAM_PAGES = `'
$endMarker = '`;'

$startIndex = $scr.IndexOf($startMarker)
if ($startIndex -lt 0) {
    Write-Error "Start marker not found"
    exit 1
}
$startIndex += $startMarker.Length

$endIndex = $scr.IndexOf($endMarker, $startIndex)
if ($endIndex -lt 0) {
    Write-Error "End marker not found"
    exit 1
}

$newPages = $scr.Substring($startIndex, $endIndex - $startIndex)

$targetClosing = "];`r`n`r`nexport const SEO_LANDING_PAGE_MAP"
$targetClosingUnix = "];`n`nexport const SEO_LANDING_PAGE_MAP"

if ($seo.Contains($targetClosing)) {
    $seo = $seo.Replace($targetClosing, "," + [Environment]::NewLine + [Environment]::NewLine + $newPages + "];" + [Environment]::NewLine + [Environment]::NewLine + "export const SEO_LANDING_PAGE_MAP")
    [System.IO.File]::WriteAllText($seoPath, $seo, [System.Text.Encoding]::UTF8)
    Write-Output "Appended successfully (CRLF)!"
} elseif ($seo.Contains($targetClosingUnix)) {
    $seo = $seo.Replace($targetClosingUnix, ",`n`n" + $newPages + "];`n`nexport const SEO_LANDING_PAGE_MAP")
    [System.IO.File]::WriteAllText($seoPath, $seo, [System.Text.Encoding]::UTF8)
    Write-Output "Appended successfully (LF)!"
} else {
    Write-Error "Target closing not found in seoLandingPages.ts"
    exit 1
}
