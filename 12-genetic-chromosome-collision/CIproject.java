package ciproject;

import java.awt.Color;
import javax.swing.JFrame;
/**
 *
 * @author MA
 */
public class CIproject {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
     JFrame f=new JFrame("this is mohamad ali alashkar project");
        p p=new p();
         
        p.setBackground(Color.white);
        p.setSize(500,500);
        
        f.add(p);
        f.setResizable(false);
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        f.setSize(487,510);
        f.setVisible(true);    
    }
    
}
