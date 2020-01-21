# Image Segmentation using Artificial Neural Networks

## Team Members:
- Mohaddeseh Bibak (94012269026)
- Zahra Ghanbarpour (9412261200)
- Atefeh Bezhkool (94012269025)

## Descreption:
Images are represented by a matrix of RGB values which is same
as a 3D matrix of **_height_**x**_width_**x**_3_**.
Segmetation is to create an output of same height and width asigning
a class to each pixel showing what object it belongs to.
## Encoder
Convolutional layers of a pretrained neural net can be used to segment the image
to smaller windows each containing a possible object. If such network is was
trained to detect object in the image then each layer maybe representative of
possible objects of it's window size.
## Decoder
naturally an encoder would downsample a signal thus we need a decoding layer to
step up toward a matrix of the main image size each entry holding a class value
for each pixel it is very natural to consider combining the a window with it's 
encoded value for the input of each decoding layer since class information can
be infered from encoder and pixel placement from the window itself.
## Architecture
First is layer is our defined input layer of image size and depth.
Then it is fed to first layer of the chosen model (MobileNetV2) each there are
layers selected from MobileNetV2 to slice every input to 4x4 upto 64x64 windows
between each slicing layer a concating layer joins it to coresponding input
pixels training is only done on concatenating layers (the decoding layers)
and the last layer. The last layer also eventually fixes the dimensions.
