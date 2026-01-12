# How to Check if CUDA is Installed

## Quick Check Commands

### 1. Check NVIDIA GPU and Drivers
```bash
nvidia-smi
```
- ✅ **If it works**: NVIDIA drivers installed, GPU detected
- ❌ **If it fails**: Drivers not installed or GPU not detected

### 2. Check CUDA Toolkit (Compiler)
```bash
nvcc --version
```
- ✅ **If it works**: CUDA Toolkit installed (for development)
- ❌ **If it fails**: CUDA Toolkit not installed or not in PATH

### 3. Check CUDA Runtime Libraries (What Jan Needs)
```bash
ldconfig -p | grep libcudart
```
- ✅ **If libcudart.so.12 found**: CUDA 12.x runtime installed
- ❌ **If not found**: CUDA runtime libraries missing (this is why Jan fails)

### 4. Check CUDA Installation Path
```bash
ls /usr/local/cuda*
```
- Looks for `/usr/local/cuda`, `/usr/local/cuda-12`, `/usr/local/cuda-11`, etc.

## What Jan Needs

Jan specifically needs:
- **libcudart.so.12** (CUDA 12.x runtime library)
- This is different from the CUDA Toolkit (nvcc)
- Runtime libraries can be installed separately

## Common Scenarios

### Scenario 1: GPU Works, CUDA Toolkit Installed, But Jan Fails
- ✅ `nvidia-smi` works
- ✅ `nvcc --version` works
- ❌ `libcudart.so.12` not found
- **Solution**: Install CUDA 12.x runtime libraries (can be separate from Toolkit)

### Scenario 2: GPU Works, But No CUDA
- ✅ `nvidia-smi` works
- ❌ `nvcc --version` fails
- ❌ `libcudart.so.12` not found
- **Solution**: Install CUDA Toolkit 12.x (includes runtime)

### Scenario 3: No GPU or Drivers
- ❌ `nvidia-smi` fails
- **Solution**: Install NVIDIA drivers first, then CUDA

## For Your Case

If Jan fails with `libcudart.so.12: cannot open shared object file`:
- Jan needs **CUDA 12.x runtime libraries**
- You might have CUDA Toolkit but not runtime libraries
- Or you might have CUDA 11.x (Jan needs 12.x)

## Recommendation

**Even if you have CUDA, using Ollama is still better** because:
- ✅ Ollama automatically uses GPU if available (no CUDA setup needed)
- ✅ Works on CPU too (fallback)
- ✅ No library conflicts
- ✅ Simpler setup
