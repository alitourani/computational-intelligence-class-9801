package car;

import java.awt.Color;
import java.awt.Graphics;
import java.util.ArrayList;

public class Sensor {

	public Vector start, dir;
	public int length;
	private boolean show = true;

//	public Sensor(float x, float y, int length, boolean show) {
//		start = new Vector(x, y);
//		dir = new Vector(1, 0);
//		this.length = length;
//		this.show = show;
//	}

	public Sensor(Vector pos, float angle, int length, boolean show) {
		this.start = pos;
		dir = Vector.VectorFromAngle((float) Math.toRadians(angle));
		this.length = length;
		this.show = show;
	}

	public void setDir(float angle) {
		dir = Vector.VectorFromAngle((float) Math.toRadians(angle));
	}

	public void update(Graphics g) {

		if (show) {
			g.setColor(Color.white);
			g.drawLine((int)start.x, (int)start.y, (int)(start.x + dir.x * length), (int)(start.y + dir.y * length));
		}
	}

	public double cast(ArrayList<Boundary> walls) {

		float x3 = start.x;
		float y3 = start.y;
		float x4 = start.x + dir.x;
		float y4 = start.y + dir.y;
		
		for (Boundary wall : walls) {
			float x1 = wall.start.x;
			float y1 = wall.start.y;
			float x2 = wall.end.x;
			float y2 = wall.end.y;

			float den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
			
			if (den == 0)
				return 1;
			
			float t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
			float u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
			
			if (t > 0 && t < 1 && u > 0) {
				
				float x = x1 + t * (x2 - x1);
				float y = y1 + t * (y2 - y1);
				
				double distance = Math.sqrt(Math.pow(start.x - x, 2) + Math.pow(start.y - y, 2));
				
				if (distance <= length)
					return distance / length;
			}
		}
		
		return 1;
	}
}
