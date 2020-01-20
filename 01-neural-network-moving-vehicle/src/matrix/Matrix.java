package matrix;

import java.util.Random;

public class Matrix {
	
	public double[][] data;
	
	public Matrix(int row, int col) {
		data = new double[row][col];
	}
	
	public Matrix(double[][] data) {
		
		this.data = data.clone();
	}
	
	public void randomize() {
		for (int i = 0; i < data.length; i++) {
			for (int j = 0; j < data[0].length; j++) {
				data[i][j] = new Random().nextDouble() * 2 - 1;
			}
		}
	}
	
	public Matrix transpose() {
		Matrix result = new Matrix(data[0].length, data.length);
		
		for (int i = 0; i < data.length; i++) {
			for (int j = 0; j < data[0].length; j++) {
				result.data[j][i] = data[i][j];
			}
		}
		return result;
	}
	
	public static Matrix transpose(Matrix m) {
		Matrix result = new Matrix(m.data[0].length, m.data.length);
		
		for (int i = 0; i < m.data.length; i++) {
			for (int j = 0; j < m.data[0].length; j++) {
				result.data[j][i] = m.data[i][j];
			}
		}
		return result;
	}
	
	public void add(double n) {
		for (int i = 0; i < data.length; i++) {
			for (int j = 0; j < data[0].length; j++) {
				data[i][j] += n;
			}
		}
	}
	
	public void subtract(double n) {
		for (int i = 0; i < data.length; i++) {
			for (int j = 0; j < data[0].length; j++) {
				data[i][j] -= n;
			}
		}
	}
	
	public void add(Matrix m) throws Exception {
		if (!(data.length == m.data.length && data[0].length == m.data[0].length)) 
			throw new Exception("columns and rows don't match!");
		
		for (int i = 0; i < data.length; i++) {
			for (int j = 0; j < data[0].length; j++) {
				data[i][j] += m.data[i][j];
			}
		}
	}
	
	public void subtract(Matrix m) throws Exception {
		if (!(data.length == m.data.length && data[0].length == m.data[0].length))
			throw new Exception("columns and rows don't match!");
		
		for (int i = 0; i < data.length; i++) {
			for (int j = 0; j < data[0].length; j++) {
				data[i][j] -= m.data[i][j];
			}
		}
	}
	
	public static Matrix add(Matrix m1, Matrix m2) throws Exception {
		if (!(m1.data.length == m2.data.length && m1.data[0].length == m2.data[0].length)) 
			throw new Exception("columns and rows don't match!");
		
		Matrix result = new Matrix(m1.data.length, m1.data[0].length);
		
		for (int i = 0; i < result.data.length; i++) {
			for (int j = 0; j < result.data[0].length; j++) {
				result.data[i][j] = m1.data[i][j] + m2.data[i][j];
			}
		}
		
		return result;
	}
	
	public static Matrix subtract(Matrix m1, Matrix m2) throws Exception {
		if (!(m1.data.length == m2.data.length && m1.data[0].length == m2.data[0].length)) 
			throw new Exception("columns and rows don't match!");
		
		Matrix result = new Matrix(m1.data.length, m1.data[0].length);
		
		for (int i = 0; i < result.data.length; i++) {
			for (int j = 0; j < result.data[0].length; j++) {
				result.data[i][j] = m1.data[i][j] - m2.data[i][j];
			}
		}
		
		return result;
	}
	
	public void multiply(double n) {
		for (int i = 0; i < data.length; i++) {
			for (int j = 0; j < data[0].length; j++) {
				data[i][j] *= n;
			}
		}
	}
	
	public void multiply(Matrix m) throws Exception {
		if (!(data.length == m.data.length && data[0].length == m.data[0].length)) 
			throw new Exception("columns and rows don't match!");
		
		for (int i = 0; i < data.length; i++) {
			for (int j = 0; j < data[0].length; j++) {
				data[i][j] *= m.data[i][j];
			}
		}
	}
	
	public static Matrix multiply(Matrix m1, Matrix m2) throws Exception {
		if (!(m1.data.length == m2.data.length && m1.data[0].length == m2.data[0].length)) 
			throw new Exception("columns and rows don't match!");
		
		Matrix result = new Matrix(m1.data.length, m1.data[0].length);
		for (int i = 0; i < m1.data.length; i++) {
			for (int j = 0; j < m1.data[0].length; j++) {
				result.data[i][j] = m1.data[i][j] * m2.data[i][j];
			}
		}
		
		return result;
	}
	
	public Matrix dot(Matrix m) throws Exception {
		if (data[0].length != m.data.length) 
			throw new Exception("columns and rows don't match!");
		
		Matrix result = new Matrix(data.length, m.data[0].length);
		
		for (int i = 0; i < result.data.length; i++) {
			for (int j = 0; j < result.data[0].length; j++) {
				double sum = 0;
				for (int k = 0; k < data[0].length; k++) {
					sum += data[i][k] * m.data[k][j];
				}
				result.data[i][j] = sum;
			}
		}
		
		return result;
	}
	
	public static Matrix dot(Matrix m1, Matrix m2) throws Exception {
		if (m1.data[0].length != m2.data.length) 
			throw new Exception("columns and rows don't match!");
		
		Matrix result = new Matrix(m1.data.length, m2.data[0].length);
		
		for (int i = 0; i < result.data.length; i++) {
			for (int j = 0; j < result.data[0].length; j++) {
				double sum = 0;
				for (int k = 0; k < m1.data[0].length; k++) {
					sum += m1.data[i][k] * m2.data[k][j];
				}
				result.data[i][j] = sum;
			}
		}
		
		return result;
	}
	
	public static interface Func {
		
		public double method(double d);
	}
	
	public void map(Func f) {
		for (int i = 0 ; i < data.length; i++) {
			for (int j = 0; j < data[0].length; j++) {
				data[i][j] = f.method(data[i][j]);
			}
		}
	}
	
	public static Matrix map(Matrix m, Func f) {
		Matrix result = new Matrix(m.data.length, m.data[0].length);
		for (int i = 0 ; i < m.data.length; i++) {
			for (int j = 0; j < m.data[0].length; j++) {
				result.data[i][j] = f.method(m.data[i][j]);
			}
		}
		
		return result;
	}
	
	public static Matrix fromArray(double[] arr) {
		
		Matrix res = new Matrix(arr.length, 1);
		for (int i = 0; i < arr.length; i++) {
			res.data[i][0] = arr[i];
		}
		return res;
	}
	
	public double[] toArray() {
		double[] res = new double[data.length];
		
		for (int i = 0; i < data.length; i++) {
			res[i] = data[i][0];
		}
		
		return res;
	}
	
	public void print() {
		for (int i = 0; i < data.length; i++) {
			for (int j = 0; j < data[0].length; j++) {
				System.out.print(data[i][j] + " ");
			}
			System.out.println();
		}
	}

}
