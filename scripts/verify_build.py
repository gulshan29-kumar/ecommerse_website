#!/usr/bin/env python3
# Helper script to verify Next.js build status
import subprocess

def main():
    print("Verifying NovaCart production build...")
    res = subprocess.run(["npm", "run", "build"], capture_output=True, text=True)
    if res.returncode == 0:
        print("Build PASSED successfully!")
    else:
        print("Build FAILED:")
        print(res.stderr)

if __name__ == "__main__":
    main()
