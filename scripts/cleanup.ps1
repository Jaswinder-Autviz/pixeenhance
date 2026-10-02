$files = @(
    (Join-Path $PSScriptRoot "append.ps1"),
    (Join-Path $PSScriptRoot "append-more-exam-portals.mjs"),
    (Join-Path $PSScriptRoot "add-exam-pages.mjs"),
    (Join-Path $PSScriptRoot "add_exam_pages.py"),
    (Join-Path $PSScriptRoot "cleanup.ps1")
)

foreach ($f in $files) {
    if (Test-Path $f) {
        Remove-Item -Path $f -Force
        Write-Output "Removed $f"
    }
}
