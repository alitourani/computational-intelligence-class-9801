package car;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.util.ArrayList;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.SwingUtilities;

public class Sketch extends JFrame {

	private static final long serialVersionUID = -7044496989599732077L;
	private DrawCanvas canvas;
	private ArrayList<Boundary> walls = new ArrayList<Boundary>();
	private Car car;
	
	private class DrawCanvas extends JPanel {

		private static final long serialVersionUID = 8193212504627188925L;
		
		public void paintComponent(Graphics g) {
			super.paintComponent(g);
			
			setBackground(Color.darkGray);
			
			((Graphics2D) g).setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
			
			for (Boundary b : walls) {
				b.update(g, Color.white);
			}
			
			car.update(g);

			repaint();
		}
	}
	
	public Sketch() {
		
		canvas = new DrawCanvas();
		setContentPane(canvas);
		
		setPreferredSize(new Dimension(800, 600));
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		pack();
		setResizable(false);
		setLocationRelativeTo(null);
		setFocusable(true);
		requestFocusInWindow();
		setVisible(true);
		
		level();
	}
	
	private void level() {
		
		// outer walls
		walls.add(new Boundary(50, 150, 250, 120));
		walls.add(new Boundary(250, 120, 500, 120));
		walls.add(new Boundary(500, 120, 650, 150));
		walls.add(new Boundary(650, 150, 700, 200));
		walls.add(new Boundary(700, 200, 750, 380));
		walls.add(new Boundary(750, 380, 720, 430));
		walls.add(new Boundary(720, 430, 650, 440));
		walls.add(new Boundary(650, 440, 550, 435));
		walls.add(new Boundary(550, 435, 520, 420));
		walls.add(new Boundary(520, 420, 500, 380));
		walls.add(new Boundary(500, 380, 480, 370));
		walls.add(new Boundary(480, 370, 460, 380));
		walls.add(new Boundary(460, 380, 430, 420));
		walls.add(new Boundary(430, 420, 200, 430));
		walls.add(new Boundary(200, 430, 100, 350));
		walls.add(new Boundary(100, 350, 50, 250));
		walls.add(new Boundary(50, 250, 30, 200));
		walls.add(new Boundary(30, 200, 50, 150));
		
		// inner walls
		walls.add(new Boundary(100, 200, 150, 180));
		walls.add(new Boundary(150, 180, 250, 170));
		walls.add(new Boundary(250, 170, 500, 180));
		walls.add(new Boundary(500, 180, 600, 190));
		walls.add(new Boundary(600, 190, 650, 230));
		walls.add(new Boundary(650, 230, 700, 330));
		walls.add(new Boundary(700, 330, 710, 380));
		walls.add(new Boundary(710, 380, 600, 400));
		walls.add(new Boundary(600, 400, 550, 380));
		walls.add(new Boundary(550, 380, 500, 340));
		walls.add(new Boundary(500, 340, 450, 345));
		walls.add(new Boundary(450, 345, 420, 380));
		walls.add(new Boundary(420, 380, 200, 390));
		walls.add(new Boundary(200, 390, 100, 250));
		walls.add(new Boundary(100, 250, 100, 200));
		
		car = new Car(new Vector(80, 180), -20, walls);
	}
	
	public static void main(String[] args) {
		
		SwingUtilities.invokeLater(new Runnable() {
	         public void run() {
	        	 new Sketch();
	         }
	      });
	}
}
