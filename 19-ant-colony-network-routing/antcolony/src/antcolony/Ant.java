package antcolony;

import java.util.ArrayList;
import java.util.Random;

public class Ant {
	private boolean visited[];
	private ArrayList<Integer> path = new ArrayList<>();
	private int[][] graph;
	private int desIndex;
	public Ant(int[][] graph,int currentIndex,int desIndex){
		visited = new boolean[graph.length];
		for(int i=0; i<visited.length; i++) {
			visited[i] = false;
		}
		visited[currentIndex] = true;
		this.graph = graph;
		path.add(currentIndex);
		this.desIndex = desIndex;
	}
	private void move(){
		ArrayList<Integer> bestChoices = new ArrayList<>();
		int best = 0;
		
		for(int i=0; i<graph.length; i++) {
			if(visited[i] == false) {
				visited[i] = true;
				if(graph[path.get(0)][i] > best) {
					bestChoices = new ArrayList<>();
					bestChoices.add(i);
					best = graph[path.get(0)][i];
				}else if(graph[path.get(0)][i] == best) {
					bestChoices.add(i);
				}
			}
		}
		int bestIndex = bestChoices.get(0);
		if(bestChoices.size() > 1) {
			//make random number to choose between them
			Random r = new Random();
			bestIndex = bestChoices.get(r.nextInt(bestChoices.size()));
		}
		graph[path.get(0)][bestIndex] ++;
		path.add(bestIndex);
		visited[bestIndex]=true;
		
		//if best index is own destination
		if(bestIndex == desIndex) {
			comeback();
		}
		else {
			move();
		}
		updateGraph();
	}
	private void comeback() {
		for(int i=path.size()-1; i>0; i--) {
			graph[path.get(0)][path.get(i)] ++;
			path.remove(i);
			visited[i]=false;
		}
	}
	private void updateGraph() {
		for (int i = 0; i < graph.length; i++) {
			for (int j = 0; j < graph[0].length; j++) {
				graph[i][j] --;
			}
		}
		move();
	}
}
