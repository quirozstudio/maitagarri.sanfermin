$ErrorActionPreference = "SilentlyContinue"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 4173
$prefix = "http://127.0.0.1:$port/"

Set-Location $root

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
  $listener.Start()
} catch {
  Start-Process $prefix
  exit
}

Start-Process $prefix

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $path = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath)

  if ($path -eq "/") {
    $path = "/index.html"
  }

  $relative = $path.TrimStart("/") -replace "/", [System.IO.Path]::DirectorySeparatorChar
  $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($root, $relative))

  if (-not $filePath.StartsWith($root)) {
    $context.Response.StatusCode = 403
    $context.Response.Close()
    continue
  }

  if (-not [System.IO.File]::Exists($filePath)) {
    $context.Response.StatusCode = 404
    $context.Response.Close()
    continue
  }

  $extension = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
  $contentType = switch ($extension) {
    ".html" { "text/html; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".js" { "application/javascript; charset=utf-8" }
    ".jpg" { "image/jpeg" }
    ".jpeg" { "image/jpeg" }
    ".png" { "image/png" }
    ".webp" { "image/webp" }
    default { "application/octet-stream" }
  }

  $bytes = [System.IO.File]::ReadAllBytes($filePath)
  $context.Response.ContentType = $contentType
  $context.Response.ContentLength64 = $bytes.Length
  $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $context.Response.Close()
}
