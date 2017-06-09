@echo off
cd %~dp0 >>success.log 2>>error.log
fasta2line.exe Xinput.fasta dataset.txt >>success.log 2>>error.log
MatrixCmp.exe \s \k 0 \i dataset.txt \o test.txt >>success.log 2>>error.log
peptide.exe >>success.log 2>>error.log
del dataset.txt
del test.txt