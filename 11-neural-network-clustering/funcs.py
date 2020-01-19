import numpy as np
from scipy import spatial
import matplotlib.pyplot as plt


def PlotResults(X, w, C):
    N = np.shape(w)[0]
    plt.plot(X[:, 0], X[:, 1], '.')
    for i in range(N - 1):
        for j in range(N):
            if C[i, j] == 1:
                plt.plot([w[i, 0], w[j, 0]], [w[i, 1], w[j, 1]], 'r', 'LineWidth', 2)

    plt.plot(w[:, 0], w[:, 1], 'o')
    plt.xlabel('X')
    plt.ylabel('Y')


def PlotClustring(X, w):
    dist = spatial.distance.cdist(X, w, 'euclidean')
    y = np.argmin(dist, axis=1)
    classes = np.unique(y)
    number_of_clusters = len(classes)
    color = ['r', 'b', 'g', 'k', 'm', 'r', 'b', 'g', 'k', 'm']
    for i in range(number_of_clusters):
        ind = np.nonzero(y == classes[i])[0]
        plt.plot(X[ind, 0], X[ind, 1], '.', color[i])
        plt.plot(w[i, 0], w[i, 1], 'o', color[i])


def NeuralGasNetwork(X, NGN_params):
    # --- extact parameters value ---
    N = NGN_params['N']
    MaxIt = NGN_params['MaxIt']
    tmax = NGN_params['tmax']
    epsilon_initial = NGN_params['epsilon_initial']
    epsilon_final = NGN_params['epsilon_final']
    lambda_initial = NGN_params['lambda_initial']
    lambda_final = NGN_params['lambda_final']
    T_initial = NGN_params['T_initial']
    T_final = NGN_params['T_final']

    nData = np.shape(X)[0]
    nDim = np.shape(X)[1]

    X = X[np.random.permutation(nData), :]
    Xmin = np.min(X, axis=0)
    Xmax = np.max(X, axis=0)

    # ------ Initialization ------
    plt.close('all')
    fig = plt.figure()

    w = np.zeros((N, nDim))
    w = Xmin + np.tile((Xmax - Xmin), (N, 1)) * np.random.random((N, nDim))
    C = np.zeros((N, N))
    t = np.zeros((N, N))

    tt = 0
    for it in range(MaxIt):
        for l in range(nData):
            # --- select input vector ---
            x = X[l, :]

            # --- competion and ranking
            dist = np.zeros((N,))
            for ii in range(N):
                dist[ii] = spatial.distance.euclidean(x, w[ii, :])
            SortOrder = np.argsort(dist)

            # --- Calculate Parameters ------
            epsilon = epsilon_initial * (epsilon_final / epsilon_initial) ** (tt / tmax)
            lambdaa = lambda_initial * (lambda_final / lambda_initial) ** (tt / tmax)
            T = T_initial * (T_final / T_initial) ** (tt / tmax)

            # ---- Adaptation -----
            for ki in range(N):
                i = SortOrder[ki]
                w[i, :] = w[i, :] + epsilon * np.exp(-ki / lambdaa) * (x - w[i, :])

            tt = tt + 1

            # ---- Creating Links ---
            i = SortOrder[0]
            j = SortOrder[1]
            C[i, j] = 1
            C[j, i] = 1
            t[i, j] = 0
            t[j, i] = 0

            #  ----- Aging ------
            t[i, :] = t[i, :] + 1
            t[:, i] = t[:, i] + 1

            #  ----- Remove Old Links ----
            OldLinks = np.nonzero(t[i, :] > T)[0]
            C[i, OldLinks] = 0
            C[OldLinks, i] = 0

        # --- print ----
        print("Itr : % 5.2f, epsilon : % 5.2f" % (it, epsilon))

    return w, C
