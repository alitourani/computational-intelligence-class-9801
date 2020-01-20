// adaline.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream> 
using namespace std;

int _tmain(int argc, _TCHAR* argv[])
{
	int arr[4][2];
	int t[4];
	float yi, dif, dw1, dw2, db, w1 = 0.2, w2 = 0.2, b = 0.2, err[4];

	while (true)
	{
		int number;
		cout << "Pleas choose a number: \n 1.AND \n 2.OR\n 3.NAND \n 4.NOR\n\n";
		cin >> number;
		switch (number){
		case 1:
		{
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
		}

		case 2:
		{
				  // input array 
				  int arr[4][2] = { { 1, 1 },
				  { 1, -1 },
				  { -1, 1 },
				  { -1, -1 }
				  };

				  // target array 
				  int t[4] = { 1, 1, 1, -1 }, i, j;

				  // taking bias in each case as 1 
				  // Calculation upto 5 epochs 
				  // consider learning rate = 0.2 
				  cout << "OR: \nInput[4][2] = { { 1, 1 },{ 1, -1 }, { -1, 1 }, { -1, -1 }}; \ntarget[4] = { 1, 1, 1, -1 }\n \n";
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
		}
		case 3:
		{
				  // input array 
				  int arr[4][2] = { { 1, 1 },
				  { 1, -1 },
				  { -1, 1 },
				  { -1, -1 }
				  };

				  // target array 
				  int t[4] = { -1, 1, 1, 1 }, i, j;

				  // taking bias in each case as 1 
				  // Calculation upto 5 epochs 
				  // consider learning rate = 0.2 
				  cout << "NAND: \nInput[4][2] = { { 1, 1 },{ 1, -1 }, { -1, 1 }, { -1, -1 }}; \ntarget[4] = { -1, 1, 1, 1 }\n \n";
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
		}
		case 4:
		{
				  // input array 
				  int arr[4][2] = { { 1, 1 },
				  { 1, -1 },
				  { -1, 1 },
				  { -1, -1 }
				  };

				  // target array 
				  int t[4] = { -1, -1, -1, 1 }, i, j;

				  // taking bias in each case as 1 
				  // Calculation upto 5 epochs 
				  // consider learning rate = 0.2 
				  cout << "NOR: \nInput[4][2] = { { 1, 1 },{ 1, -1 }, { -1, 1 }, { -1, -1 }}; \ntarget[4] = { -1, -1, -1, 1 }\n \n";
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
		}
		default:
			break;
		}
	}
}