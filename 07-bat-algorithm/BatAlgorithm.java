
import java.util.Random;
import java.util.*;


public class BatAlgorithm {
	private static final float Val = 30000;
	//size: number of cities
	public static int city_seen(int city_num, int size, int[] pattern)
	{
		int i;
		for (i = 0; i < size ; i++)
		{
			if (pattern[i] == city_num)
			{
				return 1;
			}
		}
		return 0;
	}

	//generate a random path
	public static void random_path_generator(int size, int[] random_path)
	{

		int city_num;
		int x;
		int i;
		//initialise each element as 0
		for (x = 0; x < size+1; x++)
			{
				random_path[x] = 0;
			}

		for (x = 0; x < size; x++)
		{
			while (true)
			{

				city_num = new Random().nextInt() % size + 1;

				if (city_seen(city_num, size, random_path) == 0)
				{
					random_path[x] = city_num;
					break;
				}
			}
		}
			random_path[size] = random_path[0];
			System.out.print("\nRandom Generated path : ");
			for (i = 0;i < size+1;i++)
			{
				System.out.printf("%d - ",random_path[i]);
			}
	}
		
	//Calculate cost of the path
	public static int cost_of_path(int size, int[] path, int[][] path_matrix)
	{
		int cost = 0;

		for (int i = 1;i < size+1;i++)
		{
			int city1_name = path[i - 1];
			int city2_name = path[i];
			int row_idx = city1_name-1;
			int col_idx = city2_name-1;
			cost += path_matrix[row_idx][col_idx];
		}

		return cost;
	}

	//input of path matrix
	public static void enter_path_matrix(int size, int[][] path_matrix)
	{
		Scanner scanner1 = new Scanner(System.in);
		for (int i = 0;i < size;i++)
		{
			for (int j = 0;j < size;j++)
			{
				String tempVar = scanner1.nextLine();
				if (tempVar != null)
				{
					path_matrix[i][j] = Integer.parseInt(tempVar);
				}
			}
		}

	}

	//Display path matrix
	public static void print_path_matrix(int size, int[][] path_matrix)
	{
		System.out.print("The path matrix is-\n");
		for (int i = 0;i < size;i++)
		{
			for (int j = 0;j < size;j++)
			{
				System.out.printf("%d\t",path_matrix[i][j]);
			}
			System.out.print("\n");
		}
	}

	public static void sort(int solutions, int[] cost, int[] idx)
	{
		int temp;
		int temp_idx;

		for (int i = 0;i < solutions - 1;i++)
		{
			for (int j = 0;j < solutions - i - 1;j++)
			{
				if (cost[j] > cost[j + 1])
				{
					temp = cost[j];
					cost[j] = cost[j + 1];
					cost[j + 1] = temp;

					temp_idx = idx[j];
					idx[j] = idx[j + 1];
					idx[j + 1] = temp_idx;
				}
			}
		}
	}
	
	public static void BatAlgorithm(int size, int solutions, double[] freq, int[][] random_paths, int[] cost, int[][] path_matrix, int[] idx)
	{
		System.out.print("\nStarting Bats-\n");
		//int d = 3;
		int n_bats = 50;
		double fitness;
		int[][] best = new int[3][size+1];
		int k = 0;
		int flag1 = 0;
		int flag2 = 0;
		int cont = 0;
		int temp;
		int min_path_idx = -1;
//		int distance[];
		int min_freq_idx = 0;
		fitness = freq[0];
		for (int i = 1;i < solutions;++i)
		{
			if (freq[i] < fitness)
			{
				fitness = freq[i];
				min_freq_idx = i;
			}
		}
		sort(solutions, cost, idx);
		for (int i = 0;i < solutions;i++)
		{
			System.out.printf("\n%d = Freq : %d\tindex : %d",i,cost[i],idx[i]);
		}
		System.out.print("\nBest solution : ");
		for (int i = 0;i < size+1;i++)
		{
			best[k][i] = random_paths[idx[0]][i];
			best[k + 1][i] = random_paths[idx[1]][i];
			best[k + 2][i] = random_paths[idx[2]][i];
		}

		int min_cost = cost[0];
		System.out.printf("\nCost = %d",min_cost);

		//Initialising paramters for Bat
		double A; //Loudness and pulse rate
		double r;
		A = 0.25;
		r = 0.3;
		//counting number of iterations
		int n_iter = 0;

		int[] sample_1 = new int[size+1];
		int[] sample_2 = new int[size+1];
		int[] best_sol = new int[size+1];
		for (int i = 0;i < size+1;i++)
		{
			best_sol[i] = best[0][i];
		}
		k = 0;
		int ins = 0;
		while(n_bats>0)
		{
		
			for(int i=0;i<solutions;i++)
			{
				int num = new Random().nextInt()%size;
				float tot = (float)num/size; 
				if(tot>r)
				{
					k=0;
					while(k<3)
					{
						System.out.printf("\nFor Solutions %d",k+1);
						int[] temp_best = new int[size+1];
						temp_best[0]=best[k][0];
						temp_best[size]=best[k][size];
						System.out.printf("\n\nNew path generated\t");
						System.out.printf("%d - ",temp_best[0]);
						for(int j=1;j<size;++j)
						{
							ins=0;
							int node=(new Random().nextInt()%size)+1;
							for(int d=0;d<j;d++)
							{
								if(node==temp_best[d])
								{
									j--;
									ins=1;
								}
							}
							if(ins==0)
							{
								temp_best[j]=node;
								System.out.printf("%d - ",node);
							}	
						}
						System.out.printf("%d",temp_best[size]);
						int new_cost=cost_of_path(size,temp_best,path_matrix);
						System.out.printf("\tCost : %d",new_cost);
						
						if(new_cost<min_cost)
						{
							min_cost=new_cost;
							for(int j=0;j<size+1;j++)
							{
								best[k][j]=temp_best[j];
							}
						}
						k++;
					}
				}
			}
			n_bats--;
		}
		int[] best_costs = new int[3];
		for(int i=0;i<3;++i)
		{
			System.out.printf("\nBest %d = \t-",i+1);
			for(int j=0;j<size+1;j++)
			{
				System.out.printf("%d - ",best[i][j]);
			}
			best_costs[i]=cost_of_path(size,best[i],path_matrix);
			System.out.printf("\t Cost of this path : %d",best_costs[i]);
		}
		
		//Overall best
		int min1 = best_costs[0];
		int min2 = best_costs[1];
		int min3 = best_costs[2];
		
		if(min1<min2 && min1<min3)
		{
			min_cost=min1;
			min_path_idx=0;
		}
		else if(min2<min1 && min2<min3)
		{
			min_cost=min2;
			min_path_idx=1;
		}
		else if(min3<min1 && min3<min2)
		{
			min_cost=min3;
			min_path_idx=2;
		}
		System.out.printf("\nMin Cost path - %d\tPath : ",min_cost);
		for(int i=0;i<size+1;i++)
		{
			System.out.printf("%d - ",best[min_path_idx][i]);
		}
	}	

	//Objective function
	public static void objective()
	{
		Scanner scanner2 = new Scanner(System.in);
		int size;
		
		
		System.out.printf("Enter number of cities : ");
		//scanf("%d",&size);
		size = scanner2.nextInt();

		//cant declare with size as size was not given at that time
		int[][] path_matrix = new int[size][size]; //storing path matrix
		int[] pattern = new int[size+1]; //storing a randomly created walk
		int[][] random_paths = new int[10][size];		
		
		System.out.printf("Enter the cost of travelling between cities : ");
		enter_path_matrix(size,path_matrix);	//funtion to take input of path
		
		print_path_matrix(size,path_matrix);	//function to print the path matrix
		int[] cost = new int[10];
		double[] freq = new double[10];
		int[] idx = new int[10];
		for(int i=0;i<10;i++)
		{
			cost[i]=0;
			random_path_generator(size,pattern);	//generate a random path
			for(int j=0;j<size+1;++j)
				random_paths[i][j]=pattern[j];
			cost[i] += cost_of_path(size,pattern,path_matrix);
			System.out.printf("\t\tCost = %d",cost[i]);	
		}
		
		for(int i=0;i<10;i++)
		{
			freq[i] = (float)cost[i]/Val;
			idx[i]=i;
			System.out.printf("\n%lf",freq[i]);
		}
		
		BatAlgorithm(size,10,freq,random_paths,cost,path_matrix,idx);
		
	}

	public static void main(String[] args) {
		objective();	
	}

}