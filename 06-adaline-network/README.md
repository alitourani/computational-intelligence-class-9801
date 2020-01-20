# ADALINE Neural Network Implementation

## Team Members:
- Fatemeh Gholami (950122680083)
- Rafieh Pourrostami (950122680014)


## Descreption:
Program in c++ for Adaline network.

## How to Run the Project:
To run the project, you just need a c++ support application!
We used "Visual studio"

Program steps:
**1) Infinity Loop**
for repeat alot and run different logic functions.

  
	while (true)
	{
**2) Load data**
you can select a function to run.

    int number;
		cout << "Pleas choose a number: \n 1.AND \n 2.OR\n 3.NAND \n 4.NOR\n\n";
		cin >> number;

**3) case method**
Run the function according to user input.

    switch (number){
		case 1:
		case 2:
		case 3:
		case 4:

**4) Adaline algorythm**
This is a example for "AND" function.

    // input array 
				  int arr[4][2] = { { 1, 1 },
				  { 1, -1 },
				  { -1, 1 },
				  { -1, -1 }
				  };

				  // target array 
				  int t[4] = { 1, -1, -1, -1 }, i, j;

				  // taking bias in each case as 1 
				  // Calculation upto 5 epochs 
				  // consider learning rate = 0.2 
				  cout << "AND: \nInput[4][2] = { { 1, 1 }, { 1, -1 }, { -1, 1 },{ -1, -1 }}\ntarget[4] = { 1, -1, -1, -1 }\n \n";
				  for (i = 0; i < 5; i++)
				  {
					  float avg = 0;

					  cout << "******************************\n EPOCH " << i + 1 << " Errors\n******************************" << endl
						  << endl;
					  for (j = 0; j < 4; j++)
					  {
						  // calculating net input 
						  yi = arr[j][0] * w1 + arr[j][1] * w2 + 1 * b;
						  dif = t[j] - yi;

						  // updated weights 
						  w1 += 0.2 * dif * arr[j][0];
						  w2 += 0.2 * dif * arr[j][1];
						  b += 0.2 * dif * 1;
						  err[j] = dif * dif;

						  cout << err[j] << "\n";
						  avg += err[j];
					  }
					  cout << endl
						  << "Total Mean Error :" << avg << endl
						  << endl
						  << endl;


				  }
				  break;

