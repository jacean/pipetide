# issue
1. matlab程序只有在当前目录启动并且有序列文件时才能成功运行。
> C:\Users\wanja>G:\web\htdocs\peptide\src\res\exec\IMP_PUP.exe 错误
> G:\web\htdocs\peptide\src\res\exec>IMP_PUP.exe    成功

测试可得，Xinput.fasta文件必须在命令行启动目录，最后生成的Pre_result.txt也在此目录。
所以
> C:\Users\wanja>G:\web\htdocs\peptide\src\res\exec\IMP_PUP.exe
要执行成功，Xinput.fasta文件须在```C:\Users\wanja```之下，生成的Pre_result.txt也在此目录。