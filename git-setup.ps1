# Git Setup and Commit Helper Script

Write-Host ""
Write-Host "=== Git Setup and Commit Helper ===" -ForegroundColor Cyan
Write-Host ""

# Check git status
Write-Host "1. Checking Git Status..." -ForegroundColor Yellow
git status

# Check if user is configured
$userName = git config user.name
$userEmail = git config user.email

if (-not $userName -or -not $userEmail) {
    Write-Host ""
    Write-Host "Git user not configured!" -ForegroundColor Red
    Write-Host "Please configure your Git user:" -ForegroundColor Yellow
    Write-Host ""
    
    $name = Read-Host "Enter your name"
    $email = Read-Host "Enter your email"
    
    git config --global user.name "$name"
    git config --global user.email "$email"
    
    Write-Host ""
    Write-Host "Git user configured!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Git user already configured:" -ForegroundColor Green
    Write-Host "  Name: $userName"
    Write-Host "  Email: $userEmail"
}

# Stage all files
Write-Host ""
Write-Host "2. Staging files..." -ForegroundColor Yellow
git add .

# Show what will be committed
Write-Host ""
Write-Host "3. Files to be committed:" -ForegroundColor Yellow
git status --short

# Ask for commit confirmation
Write-Host ""
$confirm = Read-Host "Do you want to commit these files? (y/n)"

if ($confirm -eq 'y' -or $confirm -eq 'Y') {
    $commitMsg = Read-Host "Enter commit message (or press Enter for 'Initial commit')"
    if ([string]::IsNullOrWhiteSpace($commitMsg)) {
        $commitMsg = "Initial commit: Loan comparison table application"
    }
    
    git commit -m "$commitMsg"
    
    Write-Host ""
    Write-Host "Files committed successfully!" -ForegroundColor Green
    
    # Show next steps
    Write-Host ""
    Write-Host "=== Next Steps ===" -ForegroundColor Cyan
    Write-Host "1. Create a new repository on GitHub: https://github.com/new"
    Write-Host "2. Run these commands (replace with your repo URL):"
    Write-Host ""
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git" -ForegroundColor Yellow
    Write-Host "   git branch -M main" -ForegroundColor Yellow
    Write-Host "   git push -u origin main" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Commit cancelled." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Done! ===" -ForegroundColor Cyan
Write-Host ""
