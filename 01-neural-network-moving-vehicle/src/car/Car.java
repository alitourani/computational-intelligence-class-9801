package car;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.geom.AffineTransform;
import java.awt.geom.Line2D;
import java.util.ArrayList;

import neuralNetwork.NeuralNetwork;

public class Car {

	public Vector pos, startPos;
	public float deg = 0;
	public Sensor s1, s2;
	public int round = 1;
	public int training = 0;
	public ArrayList<Boundary> walls;
	public NeuralNetwork nn = new NeuralNetwork(2, 4, 2);

	public Car(Vector pos, int deg, ArrayList<Boundary> walls) {
		this.pos = pos;
		startPos = new Vector(pos.x, pos.y);
		this.deg = deg;
		
		boolean debug = false;
		
		s1 = new Sensor(pos, deg - 50, 35, debug);
		s2 = new Sensor(pos, deg + 50, 35, debug);
		this.walls = walls;
	}

	public void update(Graphics g) {
		// car movement in the direction
		float speed = 0.2f;
		pos.x += speed * Math.cos(Math.toRadians(deg));
		pos.y += speed * Math.sin(Math.toRadians(deg));

		// Boundary of car
		Line2D l1 = new Line2D.Double(pos.x - 10, pos.y - 5, pos.x + 10, pos.y - 5);
		Line2D l2 = new Line2D.Double(pos.x + 10, pos.y - 5, pos.x + 10, pos.y + 5);
		Line2D l3 = new Line2D.Double(pos.x + 10, pos.y + 5, pos.x - 10, pos.y + 5);
		Line2D l4 = new Line2D.Double(pos.x - 10, pos.y + 5, pos.x - 10, pos.y - 5);

		// transforming boundary of car
		AffineTransform at = 
				AffineTransform.getRotateInstance(
						Math.toRadians(deg), pos.x, pos.y);

		// painting boundary
		g.setColor(Color.blue);
		((Graphics2D) g).draw(at.createTransformedShape(l1));
		((Graphics2D) g).draw(at.createTransformedShape(l2));
		((Graphics2D) g).draw(at.createTransformedShape(l3));
		((Graphics2D) g).draw(at.createTransformedShape(l4));

		// showing sensors (if it is set to be shown)
		s1.update(g);
		s2.update(g);

		// Preparing inputs array for neural network 
		double s1Out = s1.cast(walls);
		double s2Out = s2.cast(walls);
		double[] inputs = new double[] {s1Out, s2Out};
		
		// Failure
		if (s1Out < 0.25 || s2Out < 0.25) {
			// reseting car's position and direction
			pos.x = startPos.x;
			pos.y = startPos.y;
			deg = -20;
			
			// reseting sensors directions
			s1.setDir(deg - 50);
			s2.setDir(deg + 50);
			
			// reseting training counter
			training = 0;
			// incrementing round :|
			round++;
			
			// training neural network with the last input before failing
			try {
				nn.train(inputs, bestMoveAtTheMoment(inputs));
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			// getting out of here!
			return;
		}

		// amount of steering
		double steering = 0.4;

		try {
			// letting neural network guess in which direction car should steer
			double[] guess = nn.feedForward(inputs);
			// steering
			if (guess[0] > 0.85)
				deg -= steering;
			else if (guess[1] > 0.85)
				deg += steering;
		} catch (Exception e) {
			e.printStackTrace();
		}

		// changing direction of sensors after steering
		s1.setDir(deg - 50);
		s2.setDir(deg + 50);

		// training network
		if (training < 6000) {
			// some string to show network is training
			training++;
			g.setColor(Color.green);
			g.drawString("training...", 10, 35);

			try {
				nn.train(inputs, bestMoveAtTheMoment(inputs));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		else {
			// some string to show network is not training
			g.setColor(Color.red);
			g.drawString("not training...", 10, 35);
		}
		// showing the round (Epoch)
		g.setColor(Color.white);
		g.drawString("round: " + round, 10, 20);
	}

	// training function
	public double[] bestMoveAtTheMoment(double[] inputs) {

//		double[] res = new double[] {1, 1};
		double cast1 = s1.cast(walls);
		double cast2 = s2.cast(walls);
		
		if (cast1 < cast2) {
			return new double[] {0, 1};
		}
		else if (cast1 > cast2) {
			return new double[] {1, 0};
		}
		else
			return new double[] {0, 0};

//		if (s1.cast(walls) < 1) {
//			res[0] = 0;
//		}
//		else if (s2.cast(walls) < 1) {
//			res[1] = 0;
//		}
//		else
//			return new double[] {0, 0};
//
//		return res;
	}
}
