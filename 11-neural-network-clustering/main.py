
from scipy.io import loadmat
from funcs import *

# ----- load dataset ------
dataset_path = 'datasets'
filename = 'spiral'
dataset = loadmat(dataset_path + '/' + filename+'.mat')

# ----- extract features from dataset
X = dataset['X']  # features


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

# ---- clustering --------
w,C = NeuralGasNetwork(X, NGN_params)

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