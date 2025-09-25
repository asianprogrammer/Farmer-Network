# delete.ps1
Set-Location -Path "D:\Producation\React-UI"

$files = @(
    "src\components\ui\UserDetails.jsx",
    "src\components\ui\ProfileInfo.jsx",
    "src\components\ui\ChangePassword.jsx",
    "src\components\ui\Appearance.jsx",
    "src\components\ui\AccountActions.jsx",
    "src\components\ui\SaveButton.jsx",
    "src\assets\styles\ProfileView.css",
    "src\assets\styles\commentbox.css",
    "src\assets\styles\SaveButton.css",
    "src\assets\styles\ProfileInfo.css",
    "src\assets\styles\Appearance.css",
    "src\assets\styles\AccountActions.css"
)

foreach ($f in $files) {
    $fullPath = Join-Path -Path (Get-Location) -ChildPath $f
    if (Test-Path $fullPath) {
        Remove-Item $fullPath -Force
        Write-Host "Deleted: $f"
    } else {
        Write-Host "Not found (skipped): $f"
    }
}
