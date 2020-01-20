from __future__ import division
import math
import random
import warnings
from itertools import repeat
import numpy as np
from functools import partial
from operator import attrgetter
from functools import partial
try:
    from collections.abc import Sequence
except ImportError:
    from collections import Sequence


# initialization methods


def repeatInitialization(container, func, n):
    arr = []
    for i in range(0, n):
        arr.append(func())
    return container(arr)


def iterationInitialization(container, generator):
    return container(generator())

# selection methods


def randomSelection(individuals, k):
    arr = []
    for i in range(0, k):
        arr.append(random.choice(individuals))
    return arr


def tournamentSelection(individuals, k, tournsize, fit_attr="fitness"):
    return [max(randomSelection(individuals, tournsize), key=attrgetter(fit_attr)) for i in xrange(k)]


def rouletteSelection(individuals, k, fit_attr="fitness"):
    s_inds = individuals.sort(key=attrgetter(fit_attr), reverse=True)
    arr = []
    for ind in individuals:
        arr.append(getattr(ind, fit_attr).values[0])
    fitnessSummation = sum(arr)
    selections = []
    for i in range(0, k):
        summation = 0
        for ind in s_inds:
            summation += getattr(ind, fit_attr).values[0]
            if summation > random.random() * fitnessSummation:
                selections.append(ind)
                break
    return selections

# crossover methods


def onePointCrossOver(ind1, ind2):
    crossBreakPoint = random.randint(1, min(len(ind1), len(ind2)) - 1)
    ind1[crossBreakPoint:] = ind2[crossBreakPoint:]
    ind2[crossBreakPoint:] = ind1[crossBreakPoint:]
    return ind1, ind2


def twoPointCrossOver(ind1, ind2):
    crossBreakPoint1 = random.randint(1, min(len(ind1), len(ind2)))
    crossBreakPoint2 = random.randint(1, min(len(ind1), len(ind2)) - 1)
    crossBreakPoint2 += 1 if crossBreakPoint2 >= crossBreakPoint1 else 0
    if crossBreakPoint2 < crossBreakPoint1:
        crossBreakPoint1, crossBreakPoint2 = crossBreakPoint2, crossBreakPoint1
    else:
        crossBreakPoint1, crossBreakPoint2 = crossBreakPoint1, crossBreakPoint2
    ind1[crossBreakPoint1:crossBreakPoint2], ind2[crossBreakPoint1:crossBreakPoint2] = \
    ind2[crossBreakPoint1:crossBreakPoint2], ind1[crossBreakPoint1:crossBreakPoint2]
    return ind1, ind2


def twoPointsCrossOver(ind1, ind2):
    return twoPointCrossOver(ind1, ind2)


def uniformCrossOver(ind1, ind2, indpb):
    for i in xrange(min(len(ind1), len(ind2))):
        if random.random() < indpb:
            ind1[i], ind2[i] = ind2[i], ind1[i]
    return ind1, ind2

# mutation methods


xrange = range


def gaussianMutation(individual, mu, sigma, indpb):
    size = len(individual)
    if not isinstance(mu, Sequence):
        mu = repeat(mu, size)
    if not isinstance(sigma, Sequence):
        sigma = repeat(sigma, size)
    for i, m, s in zip(range(0, size), mu, sigma):
        if random.random() < indpb:
            individual[i] += random.gauss(m, s)
    return individual,


def polynomialBoundedMutation(individual, eta, low, up, indpb):
    size = len(individual)
    if not isinstance(low, Sequence):
        low = repeat(low, size)
    if not isinstance(up, Sequence):
        up = repeat(up, size)
    for i, xl, xu in zip(xrange(size), low, up):
        if random.random() <= indpb:
            x = individual[i]
            delta_1 = (x - xl) / (xu - xl)
            delta_2 = (xu - x) / (xu - xl)
            rand = random.random()
            mut_pow = 1.0 / (eta + 1.)
            if rand < 0.5:
                xy = 1.0 - delta_1
                val = 2.0 * rand + (1.0 - 2.0 * rand) * xy ** (eta + 1)
                if val < 0:
                    delta_q = -((-val) ** (mut_pow)) - 1.0
                else:
                    delta_q = val ** (mut_pow) - 1.0
            else:
                xy = 1.0 - delta_2
                val = 2.0 * (1.0 - rand) + 2.0 * (rand - 0.5) * xy ** (eta + 1)
                if val < 0:
                    delta_q = 1.0 - (-((-val) ** (mut_pow)))
                else:
                    delta_q = 1.0 - val ** mut_pow
            x = x + delta_q * (xu - xl)
            x = min(max(x, xl), xu)
            individual[i] = x
    return individual,

def shuffleIndexesMutation(individual, indpb):
    for i in range(0, len(individual)):
        if random.random() < indpb:
            swap_indx = random.randint(0, len(individual) - 2)
            if swap_indx >= i:
                swap_indx += 1
            individual[i], individual[swap_indx] = \
                individual[swap_indx], individual[i]
    return individual,


def flipBitMutation(individual, indpb):
    for i in range(0, len(individual)):
        if random.random() < indpb:
            individual[i] = type(individual[i])(not individual[i])

    return individual,


l = 10
gen_idx = partial(random.sample, range(l), l)
pop = repeatInitialization(list, gen_idx, 10)

pop = randomSelection(pop, 2)
ind = twoPointsCrossOver(pop[0], pop[1])
ind = polynomialBoundedMutation(ind[0], low=0.0, up=1.0, eta=20.0, indpb=1.0/5)

print(ind)
