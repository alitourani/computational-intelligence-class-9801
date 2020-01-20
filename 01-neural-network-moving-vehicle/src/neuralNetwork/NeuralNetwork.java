package neuralNetwork;

import matrix.Matrix;

public class NeuralNetwork {
	
	public Matrix weightsIH, weightsHO, biasH, biasO;
	public double learningRate = 0.1;

	public NeuralNetwork(int inputNodes, int hiddenNodes, int outputNodes) {
		
		weightsIH = new Matrix(hiddenNodes, inputNodes);
		weightsHO = new Matrix(outputNodes, hiddenNodes);
		weightsIH.randomize();
		weightsHO.randomize();

		biasH = new Matrix(hiddenNodes, 1);
		biasO = new Matrix(outputNodes, 1);
		
		biasH.randomize();
		biasO.randomize();
	}
	
	public void setLearningRate(double learningRate) {
		this.learningRate = learningRate;
	}
	
	public double sigmoid(double x) {
		return 1 / (1 + Math.exp(-x));
	}
	
	public double dsigmoid(double y) {
		return y * (1 - y);
	}
	
	public double[] feedForward(double[] inputArray) throws Exception {
		
		Matrix inputs = Matrix.fromArray(inputArray);
		Matrix hidden = Matrix.dot(weightsIH, inputs);
		hidden.add(biasH);
		
		hidden.map(f -> sigmoid(f));
		
		Matrix output = Matrix.dot(weightsHO, hidden);
		output.add(biasO);
		
		output.map(f -> sigmoid(f));
		
		return output.toArray();
	}
	
	public void train(double[] inputArray, double[] targetsArray) throws Exception {
		
		Matrix targets = Matrix.fromArray(targetsArray);
		
		// feed forward algorithm //
		Matrix inputs = Matrix.fromArray(inputArray);
		Matrix hidden = Matrix.dot(weightsIH, inputs);
		hidden.add(biasH);
		
		hidden.map(f -> sigmoid(f));
		
		Matrix outputs = Matrix.dot(weightsHO, hidden);
		outputs.add(biasO);
		
		outputs.map(f -> sigmoid(f));
		// feed forward algorithm //
		
		// Calculate outputs ERRORS
		Matrix outputErrors = Matrix.subtract(targets, outputs);
		
		// Calculate outputs Gradients
		Matrix outputsGradients = Matrix.map(outputs, f -> dsigmoid(f));
		outputsGradients.multiply(outputErrors);
		outputsGradients.multiply(learningRate);
		
		// Calculate outputs Deltas
		Matrix hidden_t = Matrix.transpose(hidden);
		Matrix weightsHO_deltas = Matrix.dot(outputsGradients, hidden_t);
		
		// adjust outputs weights
		weightsHO.add(weightsHO_deltas);
		// adjust outputs bias
		biasO.add(outputsGradients);
		
		// Calculate hidden layer ERRORS
		Matrix weightsHO_t = Matrix.transpose(weightsHO);
		Matrix hiddenErrors = Matrix.dot(weightsHO_t, outputErrors);
		
		// Calculate hidden Gradients
		Matrix hiddenGradients = Matrix.map(hidden, f -> dsigmoid(f));
		hiddenGradients.multiply(hiddenErrors);
		hiddenGradients.multiply(learningRate);
		
		// Calculate hidden Deltas
		Matrix inputs_t = Matrix.transpose(inputs);
		Matrix weightsIH_deltas = Matrix.dot(hiddenGradients, inputs_t);
		
		// adjust hidden weights
		weightsIH.add(weightsIH_deltas);
		// adjust hidden bias
		biasH.add(hiddenGradients);
		
	}
	
	public static void print(double[] data) {
		for (double d : data) {
			System.out.print(d + " ");
		}
		System.out.println();
	}
	
//	public static void main(String[] args) {
//		NeuralNetwork nn = new NeuralNetwork(3, 3, 1);
//
//		double[][] trainingData = new double[][] {{0, 0, 0}, {0, 0, 1}, {0, 1, 0}, {0, 1, 1}, {1, 0, 0}, {1, 0, 1}, {1, 1, 0}, {1, 1, 1}};
//		double[][] targets = new double[][] {{0}, {1}, {1}, {0}, {1}, {0}, {0}, {1}};
//		
//		
//		for (int i = 0; i < 100000; i++) {
//			for (int j = 0; j < trainingData.length; j++) {
//				try {
//					nn.train(trainingData[j], targets[j]);
//				} catch (Exception e) {
//					e.printStackTrace();
//				}
//			}
//		}
//		
//		try {
//			print(nn.feedForward(new double[]{1, 0, 0}));
//			print(nn.feedForward(new double[]{0, 1, 0}));
//			print(nn.feedForward(new double[]{0, 0, 1}));
//			print(nn.feedForward(new double[]{1, 1, 1}));
//			print(nn.feedForward(new double[]{1, 1, 0}));
//			print(nn.feedForward(new double[]{1, 0, 1}));
//			print(nn.feedForward(new double[]{0, 1, 1}));
//			print(nn.feedForward(new double[]{0, 0, 0}));
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}

}
