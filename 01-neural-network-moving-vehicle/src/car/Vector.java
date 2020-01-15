package car;

public class Vector {

	public float x, y;
	
	public Vector() {
		x = 0;
		y = 0;
	}
	
	public Vector(float x, float y) {
		this.x = x;
		this.y = y;
	}
	
	public static Vector VectorFromAngle(float angle) {
		return new Vector((float) Math.cos(angle), (float) Math.sin(angle));
	}
	
	public void normalize() {
		
		float div = (float) Math.sqrt(x * x + y * y);
		
		x = x / div;
		y = y / div;
	}
}
