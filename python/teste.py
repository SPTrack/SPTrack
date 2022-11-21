import psutil

print(psutil.disk_usage('/').free / 1024.0 ** 3)