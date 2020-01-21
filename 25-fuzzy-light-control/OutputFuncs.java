package Fuzzi.Logic;

public class OutputFuncs {
	public static float evaluate(String[] in, float[] i) {
		
		if(i[1] != 0.0F) {
			float tmp= i[0];
			i[0] = i[1];
			i[1] = tmp;
		}
		
		if(in[0].equals("PS")) in[0] ="NL";
		else if(in[0].equals("PM")) in[0] ="NM";
		else if(in[0].equals("AZ")) in[0] ="AZ";
		else if(in[0].equals("NM")) in[0] ="PM";
		else if(in[0].equals("NL")) in[0] ="PS";
		
		if(in[1].equals("PS")) in[1] ="NL";
		else if(in[1].equals("PM")) in[1] ="NM";
		else if(in[1].equals("AZ")) in[1] ="AZ";
		else if(in[1].equals("NM")) in[1] ="PM";
		else if(in[1].equals("NL")) in[1] ="PS";
		else in[1] ="";

		return OutputFuncs.centerOfArea(in, i);
	}
	
	public static float centerOfArea(String[] in, float[] i) {
		float out = 0.0F;
		
		int start = 0;
		int finish = 0;
		float middle = 0.0F;
		float middleValue = 0.0F;
		float a = 0.0F;
		float b = 0.0F;
		
		if(in[0].equals("NL")) {
			start = 0;
			if(in[1].equals("")) finish = 4;
			else finish = 13;
			middle = start + ((finish - start)/2);
			if(i[1]<i[0]) middleValue = OutputFuncs.NL(middle);
			else middleValue = OutputFuncs.NM(middle);
		
		}
		
		if(in[0].equals("NM")) {
			start = 3;
			if(in[1].equals("")) finish = 13;
			else finish = 18;
			
			middle = start + ((finish - start)/2);
			
			if(i[1]<i[0]) middleValue = OutputFuncs.NM(middle);
			else middleValue = OutputFuncs.AZ(middle);
				
		
		}
		
		if(in[0].equals("AZ")) {
			start = 10;
			if(in[1].equals("")) finish = 18;
			else finish = 24;
			
			middle = start + ((finish - start)/2);
			
			if(i[1]<i[0]) middleValue = OutputFuncs.AZ(middle);
			else middleValue = OutputFuncs.PM(middle);
				
		
		}
		if(in[0].equals("PM")) {
			start = 16;
			finish = 24;
			if(in[1].equals("AZ")) finish = 10;
			middle = start + ((finish - start)/2);
			
			if(i[1]<i[0]) middleValue = OutputFuncs.PM(middle);
			else middleValue = OutputFuncs.PS(middle);
				
		
		}
		if(in[0].equals("PS")) {
			start = 22;
			if(in[0].equals("PM")) start = 16;
			finish = 24;
			middle = start + ((finish - start)/2);
			middleValue = OutputFuncs.PS(middle);
		
		}

		for(int j = start; j < middle; j ++) a += j;
		for(int k = (int) middle; k <= finish; k++) b += k;

		a *= i[0];
		b *= i[1];
		
		
		
		return (a + b + (middle*middleValue))/(( i[0] * (((int) middle) - start)) + middleValue + (i[1] * (finish - ((int) middle)))) + 3;
		
}

	public static float NL(float i) { return (4-i)/4; }
	public static float NM(float i) { return (i < 8F)?((i-3)/5):((13-i)/5); }
	public static float AZ(float i) { return (i < 16F)?((i-10)/6):((18-i)/2); }
	public static float PM(float i) { return (i < 20F)?((i-16)/4):((24-i)/4); }
	public static float PS(float i) { return (i<24F)?((i-22)/2):(1F); }
}
