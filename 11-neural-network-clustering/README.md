# Implementing a Neural Network for Clustering

## Team Members:
- Ashraf Abedat (95122615002)
- Bashar Nader (9412261500)
- Ahmad Meshkaf (94122611001)
- Noureddin Scherbo (9512268500)

## Descreption:
In this project, a neural network algorithm is implemented to solve the clustering problem in Python software.
The gas neural network algorithm is one of the competing neural networks that use the unobserved learning method to learn it, so it can be used to solve clustering, image segmentation, and so on. 

To run the project, first install the necessary libraries like numpy, scipy, matplotlib, etc. and run the main.py file to save the results to the results folder after the execution.
The main steps of the project are as follows (main.py)

• Import the necessary libraries and functions written in the funcs.py file
from scipy.io import loadmat
from funcs import *

• Loading data
# ----- load dataset ------
dataset_path = 'datasets'
filename = 'spiral'
dataset = loadmat(dataset_path + '/' + filename+'.mat')

# ----- extract features from dataset
X = dataset['X']  # features

• Adjustment and Parameterization of the Neural Network Algorithm
# ---- initial NeuralGasNetwork parameters ----
NGN_params = {'N':100, #number clusters
            'MaxIt':100,
            'tmax':8000,
            'epsilon_initial':0.9,
            'epsilon_final':0.4,
            'lambda_initial':10,
            'lambda_final':1,
            'T_initial':5,
            'T_final':10,
            }

• Function call of the neural network algorithm for clustering
# ---- clustering --------
w,C = NeuralGasNetwork(X, NGN_params)

• Draw shapes and save them to the results folder
# ---- plot and save -----
fig1 = plt.figure()
PlotResults(X, w, C)
plt.title(filename)
plt.show()
figName1 = 'results/'+filename+'_1.png'
fig1.savefig(figName1)

if NGN_params['N']<=3:
    fig2 = plt.figure()
    PlotClustring(X,w)
    plt.title(filename)
    plt.show()
    figName2 = 'results/'+filename+'_2.png'
    fig2.savefig(figName2)

  The dataset can be downloaded from the link below:

  http://cs.joensuu.fi/sipu/datasets/
