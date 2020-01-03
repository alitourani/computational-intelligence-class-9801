package ciproject;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.util.ArrayList;
import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.Timer;
/**
 *
 * @author MA
 */    
   public class p extends javax.swing.JPanel  implements ActionListener{
        //lebal 123=new lable("123");
       int x=0,y=40*11,q,c,v,count_paint;
       boolean hit=false;
       Timer t=new Timer(1, this);
       Random ran=new Random(); 
       ArrayList Chromosome = new ArrayList();
       ArrayList x_blocks =new ArrayList();
       ArrayList y_blocks = new ArrayList();
    //ArrayList xx = new ArrayList();
    //ArrayList yy = new ArrayList();     
   public void paintComponent(Graphics d){
       if(count_paint != 0){  
           try {
                  Thread.sleep(900);
           } catch (InterruptedException ex) {
               Logger.getLogger(p.class.getName()).log(Level.SEVERE, null, ex);
           }}
              t.start();
                 //  for(int i=0; i<1000000000; i++){}
               super.paintComponent(d);
               for(int i=0; i<12; i++){
                   for(int j=0; j<12; j++){
                       d.drawRect(40*i,40*j, 40,40);
                   }}
               
               d.setColor(Color.blue);
               for(int n=0; n<12; n++){
                   if(count_paint == 0){
                       c=ran.nextInt(11)*40;
                       x_blocks.add(n, c);
                       v=ran.nextInt(11)*40;
                       y_blocks.add(n, v);
                   }
                   d.fillRect((int)x_blocks.get(n), (int)y_blocks.get(n), 40, 40);
                   
               }
               if(hit == true){ d.setColor(Color.red); t.stop(); System.err.println(Chromosome);}else{d.setColor(Color.green);}
               d.fillRect(x,y, 40,40);
               System.out.println(Chromosome);
              
             }

    @Override
    public void actionPerformed(ActionEvent e) {
        q=ran.nextInt(2);
        Chromosome.add(q);
        for(int g=0; g<x_blocks.size(); g++){
        if(x == (int)x_blocks.get(g) && y == (int)y_blocks.get(g)){hit=true;}
        }
        if(q == 1){y-=40;}
        if(q == 0){x+=40;}
        count_paint++;   repaint();   
       // if(count_paint ==20){repaint(); }
    }
   

   
}
