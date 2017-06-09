@echo off
cd %~dp0
if exist query_data del query_data
pseaac.exe -i Xinput.fasta -o query_data -pcsel customproties.tmp -aac  -pse 1  -seg 3 -outfmt tab  -w 0.2 -l 11
IMKNN.exe