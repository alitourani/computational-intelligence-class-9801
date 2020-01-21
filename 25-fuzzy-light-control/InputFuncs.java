package Fuzzi.Logic;

public class InputFuncs {

	public static float[] evaluate(String[] in, int i) {
		float[] out = new float[2];
		
		switch(in[0]) {
		case "NL":
			out[0] = NL(i);
			break;
		case "NM":
			out[0] = NM(i);
			break;
		case "AZ":
			out[0] = AZ(i);
			break;
		case "PM":
			out[0] = PM(i);
			break;
		case "PS":
			out[0] = PS(i);
			break;
		default : out[0] = 0.0F;
		}
		
		switch(in[1]) {
		case "NL":
			out[1] = NL(i);
			break;
		case "NM":
			out[1] = NM(i);
			break;
		case "AZ":
			out[1] = AZ(i);
			break;
		case "PM":
			out[1] = PM(i);
			break;
		case "PS":
			out[1] = PS(i);
			break;
		default : out[1] = 0.0F;
		}
		
		
		return out;
	}
	
	public static float NL(float i) { return (50-i)/50; }
	public static float NM(float i) { return (i < 100F)?(i/100):((200-i)/100); }
	public static float AZ(float i) { return (i < 200F)?((i-150)/50):((250-i)/50); }
	public static float PM(float i) { return (i < 300F)?((i-200)/100):((400-i)/100); }
	public static float PS(float i) { return (i<400F)?((i-325)/75):(1F); }
}
