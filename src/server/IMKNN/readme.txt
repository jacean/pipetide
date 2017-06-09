IMKNN_Server为主程序，用于在预测平台上利用IMKNN算法对革兰氏阴性菌蛋白质进行亚细胞定位预测

Title: Predicting Subcellular Localization of Gram-negative Bacterial Proteins by IMKNN Algorithm

Short Name: IMKNN

程序的输入为以下几个文件：

1. train_data  训练数据集（已有）；
2. train_parameter  已训练好的分类器参数（已有）；
3  query_data   用户提交的待测数据（待生成）
该数据由用户上传fasta格式序列，每条序列都通过PseAAC提取特征得到53维特征向量，即当用户提交100条序列时，需要先通过PseAAC方法（按给定参数）生成100*53的特征矩阵（在matlab中变量名也要为query_data），这里强制要求每一行为一条蛋白质样本（行列不能转置），这样程序才能将待测数据顺利读入。



主程序会输出一个output.mat的文件，输出类似如下的预测结果：

No  Cell inner membrane	  Cell outer membrane	Cytoplasm  Extracellular Fimbrium Flagellum Nucleoid Periplasm
1    1                           -1                 -1           -1          -1       -1        -1      -1
2    -1                          -1                  1           -1          -1       -1        -1      -1

