package Fuzzi.Logic;

import java.util.Arrays;
import java.util.Scanner;

public class HouseLight {
	
	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		String input = "";
		int inputInt = 0;
		
		while(true) {
			input = in.nextLine();
			if(input.contains("shutdown")) break;
			
			inputInt = Integer.parseInt(input);
			
			System.out.println(OutputFuncs.evaluate(checkWhichFunction(inputInt),InputFuncs.evaluate(checkWhichFunction(inputInt),inputInt)));
		}
	}
	
	

	public static String[] checkWhichFunction(int i) {
		String[] out = new String[2];
		out[0] = "";
		out[1] = "";
		
		if(i < 50 && i >= 0) out[0] = "NL";
		
		if(i < 200 && i >= 0) {
			if(out[0].equals("")) {
				out[0] = "NM"; 
			}else out[1] = "NM"; 
		}
		
		if(i < 250 && i >= 150) {
			if(out[0].equals("")) {
				out[0] = "AZ"; 
			}else out[1] = "AZ"; 
		}
		
		if(i < 400 && i >= 200) {
			if(out[0].equals("")) {
				out[0] = "PM"; 
			}else out[1] = "PM"; 
		}
		
		if(i < 500 && i >= 350) {
			if(out[0].equals("")) {
				out[0] = "PS"; 
			}else out[1] = "PS"; 
		}
		return out;
	}
}
