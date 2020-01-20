import numpy as np
import skfuzzy as fuzz
import matplotlib.pyplot as plt
import matplotlib.pyplot as plt2
from skfuzzy import control as ctrl
from mpl_toolkits.mplot3d import Axes3D

# Generate universe variables
# * distanceance is on subjective ranges [0, 10] in units of m.
# *Speed is on subjective ranges [0, 10] in units of m/s.
# * Brake pedal force (deaccelaration) has a range of [0, 24] in units of N.
dist = np.arange(0, 11, 1)
speed = np.arange(0, 11, 1)
Brake_F = np.arange(0, 25, 1)
# Generate fuzzy membership functions
Dist_V_cls = fuzz.trimf(dist, [0, 0, 4])
Dist_cls = fuzz.trapmf(dist, [2, 4, 6, 8])
Dist_far = fuzz.trimf(dist, [6, 10, 10])
####################################################
speed_2_slow = fuzz.trapmf(speed, [0, 0, 1, 2])
speed_slow = fuzz.trapmf(speed, [1, 2, 3, 4])
speed_op = fuzz.trapmf(speed, [3, 4, 5, 6])
speed_fast = fuzz.trapmf(speed, [5, 6, 7, 8])
speed_2_fast = fuzz.trapmf(speed, [7, 8, 10,10])
####################################################
Dec_brake_greatly = fuzz.trimf(Brake_F, [0, 4, 8])
Dec_brake_slightly = fuzz.trimf(Brake_F, [4, 8, 12])
No_brake = fuzz.trimf(Brake_F, [8, 12, 16])
Inc_brake_slightly = fuzz.trimf(Brake_F, [12, 16, 20])
Inc_brake_greatly = fuzz.trimf(Brake_F, [16, 20, 24])
# Visualize these universes and membership functions
fig, (ax0, ax1, ax2) = plt.subplots(nrows=3, figsize=(10, 10))
ax0.plot(dist, Dist_V_cls, 'b', linewidth=1.5, label='Very-Close')
ax0.plot(dist, Dist_cls, 'g', linewidth=1.5, label='Close')
ax0.plot(dist, Dist_far, 'r', linewidth=1.5, label='Far')
ax0.set_title('Inter-vehicle distance')
ax0.legend()
ax1.plot(speed, speed_2_slow, 'b', linewidth=1.5, label='Too Slow')
ax1.plot(speed, speed_slow, 'y', linewidth=1.5, label='Slow')
ax1.plot(speed, speed_op, 'g', linewidth=1.5, label='optimun')
ax1.plot(speed, speed_fast, 'r', linewidth=1.5, label='Fast')
ax1.plot(speed, speed_2_fast, 'k', linewidth=1.5, label='Too Fast')
ax1.set_title('Speed')
ax1.legend()
ax2.plot(Brake_F, Dec_brake_slightly, 'b', linewidth=1.5, label='Dec-Slightly')
ax2.plot(Brake_F, Dec_brake_greatly, 'y', linewidth=1.5, label='Dec-Greatly')
ax2.plot(Brake_F, No_brake, 'g', linewidth=1.5, label='No_brake')
ax2.plot(Brake_F, Inc_brake_slightly, 'r', linewidth=1.5, label='Inc_Slightly')
ax2.plot(Brake_F, Inc_brake_greatly, 'k', linewidth=1.5, label='Inc_Greatly')
ax2.set_title('Brake_Force_Amount')
ax2.legend()
# Turn off top/right axes
for ax in (ax0, ax1, ax2):
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.get_xaxis().tick_bottom()
    ax.get_yaxis().tick_left()

plt.tight_layout()
plt.show() # To show the membership inputs
#dis=np.arange(0, 11, 1)
distance = ctrl.Antecedent(dist, 'distance')
speed = ctrl.Antecedent(speed, 'speed')
Brake_F = ctrl.Consequent(Brake_F,'Brake_F')
###################################################
# Generate fuzzy membership functions
distance['V_cls'] = fuzz.trimf(distance.universe, [0, 0, 4])
distance['cls'] = fuzz.trapmf(distance.universe, [2, 4, 6, 8])
distance['far'] = fuzz.trimf(distance.universe, [6, 10, 10])
#distance.view()
####################################################
speed['2_slow'] = fuzz.trapmf(speed.universe, [0, 0, 1, 2])
speed['slow'] = fuzz.trapmf(speed.universe, [1, 2, 3, 4])
speed['op'] = fuzz.trapmf(speed.universe, [3, 4, 5, 6])
speed['fast'] = fuzz.trapmf(speed.universe, [5, 6, 7, 8])
speed['2_fast'] = fuzz.trapmf(speed.universe, [7, 8, 10,10])
#speed.view()
####################################################
Brake_F['DG'] = fuzz.trimf(Brake_F.universe, [0, 4, 8])
Brake_F['DS'] = fuzz.trimf(Brake_F.universe, [4, 8, 12])
Brake_F['NF'] = fuzz.trimf(Brake_F.universe, [8, 12, 16])
Brake_F['IS'] = fuzz.trimf(Brake_F.universe, [12, 16, 20])
Brake_F['IG'] = fuzz.trapmf(Brake_F.universe, [16, 20, 24, 24])
#Brake_F.view()
# Visualize these universes and membership functions
#distance.view()
"""
The Fuzzy design rules
rule1= If too close , then increase greatly.
rule2= If close and too fast , then increase slightly.
rule3= If close and optimum, then increase slightly.
rule4= If far and optimum, then no reaction.
If far and slow , then slightly decrease.
If far or too slow, then greatly decrease.
"""
rule1 = ctrl.Rule(distance['V_cls'], Brake_F['IG'])
rule2 = ctrl.Rule(distance['cls'] & speed['2_fast'] , Brake_F['IS'])
rule3 = ctrl.Rule(distance['cls'] & speed['op'] , Brake_F['IS'])
rule4 = ctrl.Rule(distance['far'] & speed['op'] , Brake_F['NF'])
rule5 = ctrl.Rule(distance['far'] & speed['slow'] , Brake_F['DS'])
rule6 = ctrl.Rule(distance['far'] & speed['2_slow'] , Brake_F['DG'])
brake_ctrl = ctrl.ControlSystem([rule1, rule2, rule3, rule4, rule5, rule6])
braking = ctrl.ControlSystemSimulation(brake_ctrl)
# Pass inputs to the ControlSystem using Antecedent labels with Pythonic API
# Note: if you like passing many inputs all at once, use .inputs(dict_of_data)
braking.input['distance'] = 8
braking.input['speed'] = 5
# Crunch the numbers
braking.compute()
print(braking.output['Brake_F'])
Brake_F.view(sim=braking)
""""""
sim = ctrl.ControlSystemSimulation(brake_ctrl, flush_after_run=24 * 24 + 1)
# We can simulate at higher resolution with full accuracy
upsampled = np.linspace(0, 10, 25)
x, y = np.meshgrid(upsampled, upsampled)
z = np.zeros_like(x)
# Loop through the system 21*21 times to collect the control surface
for i in range(10):
    for j in range(10):
        sim.input['distance'] = x[i, j]
        sim.input['speed'] = y[i, j]
        sim.compute()
        z[i, j] = sim.output['Brake_F']

fig = plt.figure(figsize=(8, 8))
ax = fig.add_subplot(111, projection='3d')
surf = ax.plot_surface(x, y, z, rstride=1, cstride=1, cmap='viridis',linewidth=0.4, antialiased=True)
cset = ax.contourf(x, y, z, zdir='z', offset=-2.5, cmap='viridis', alpha=0.5)
cset = ax.contourf(x, y, z, zdir='x', offset=3, cmap='viridis', alpha=0.5)
cset = ax.contourf(x, y, z, zdir='y', offset=3, cmap='viridis', alpha=0.5)
ax.view_init(10, 20)
plt.show()