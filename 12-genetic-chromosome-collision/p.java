package ciproject;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.util.ArrayList;
import java.util.Random;
import javax.swing.Timer;

/**
 *
 * @author MA
 */    
   public class p extends javax.swing.JPanel implements ActionListener,KeyListener{
        //lebal 123=new lable("123");
       int x=0,y=40*11,q,c,v;
       Random ran=new Random(); 
       ArrayList Chromosome = new ArrayList(12);
    //ArrayList xx = new ArrayList();
    //ArrayList yy = new ArrayList();    
      // Timer t=new Timer(1, this);
        public p(){ 
       addKeyListener((KeyListener) this); 
        setFocusable(true);
        setFocusTraversalKeysEnabled(true);
   }

   public void paintComponent(Graphics d){
       //if(q==0){super.paintComponent(d); }
       super.paintComponent(d);
       for(int i=0; i<12; i++){
        for(int j=0; j<12; j++){
             d.drawRect(40*i,40*j, 40,40);
        }}
       d.setColor(Color.blue);
       for(int n=1; n<12; n++){
             c=ran.nextInt(11);
             v=ran.nextInt(11);
       d.fillRect(c*40, v*40, 40, 40);
       }
       
      d.setColor(Color.green);
      d.fill3DRect(x,y, 40,40,true);
      repaint(x,y, 40,40);
       }
   
    @Override
    public void actionPerformed(ActionEvent e) {
       // throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
         switch(q){
             case 1:
                y-=40;
              break;
           /* case 2:
                y+=1;
              break;*/
            case 0:
                x+=40;            
               break;
          /*  case 4:
                x-=1;               
              break;*/
              }
    }

    @Override
    public void keyTyped(KeyEvent e) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void keyPressed(KeyEvent e) {
        Chromosome.add(q);
        System.out.print(Chromosome);
       // throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
       switch(e.getKeyCode()){
            case KeyEvent.VK_UP:
                y-=40;          q=1;
               break;
           /* case KeyEvent.VK_DOWN:
                y+=0;          q=2;
                break;*/
            case KeyEvent.VK_RIGHT:
                x+=40;          q=0;
                break;
           /* case KeyEvent.VK_LEFT:
                x-=0;          q=4;
                break;*/
              }
           
    }

    @Override
    public void keyReleased(KeyEvent e) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
