package school.sptech.jfreechart.sample;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import com.github.britooo.looca.api.core.Looca;
import java.awt.Color;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.NumberAxis;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.plot.XYPlot;
import org.jfree.chart.renderer.xy.XYLineAndShapeRenderer;
import org.jfree.data.xy.XYDataset;
import org.jfree.data.xy.XYSeries;
import org.jfree.data.xy.XYSeriesCollection;
import org.jfree.ui.ApplicationFrame;


/**
 *
 * @author diego
 */
public class GraficoCPUxTEMPERATURA extends ApplicationFrame{

    private XYSeries series1;
    private XYSeriesCollection dataSet;

    Looca looca = new Looca();

    Integer temperatura = looca.getTemperatura().getTemperatura().intValue();
    

    public GraficoCPUxTEMPERATURA(String title)  {
        super(title);
    }
    
   

    //Inicializa o dataset (colocar aqui leitura inicial do Looca)
    public XYDataset gerarDataSetInicial() {

        this.series1 = new XYSeries("Temperatura");
        series1.add(0.0, 0.0);

        final XYSeriesCollection dataset = new XYSeriesCollection();
        dataset.addSeries(series1);

        return dataset;

    }

    // Criando um gráfico de linha para exemplo
    public JFreeChart gerarGrafico(final XYDataset dataset) {

        JFreeChart chart = ChartFactory.createXYLineChart(
                "Temperatura",
                "",
                "",
                dataset,
                PlotOrientation.VERTICAL,
                true,
                true,
                false
        );

        chart.setBackgroundPaint(Color.WHITE);

        final XYPlot plot = chart.getXYPlot();
        plot.setBackgroundPaint(Color.white);
        plot.setDomainGridlinePaint(Color.white);
        plot.setRangeGridlinePaint(Color.white);

        final XYLineAndShapeRenderer renderer = new XYLineAndShapeRenderer();
        plot.setRenderer(renderer);

        final NumberAxis rangeAxis = (NumberAxis) plot.getRangeAxis();
        rangeAxis.setStandardTickUnits(NumberAxis.createIntegerTickUnits());

        return chart;
    }

    // Método de exemplo que atualiza os dataset's
    public void atualizarDataSet() {
        
        temperatura = looca.getTemperatura().getTemperatura().intValue();

        // pegando o último valor do eixo X
        double maxXSeries1 = series1.getMaxX();

        double minXSeries1 = series1.getMinX();
  

        // Incrementando eixo X em +1 para exemplo com um valor aleatório no eixo Y
        //Substitua os valores aleatórios pelos valores lidos pelo 
        if (maxXSeries1 > 5) {
            series1.remove(minXSeries1);
        }
        series1.add(maxXSeries1 + 1, temperatura);

        // Para atualizar é necessário recriar o dataset
        dataSet = new XYSeriesCollection();

        // adicionando novamente as series
        dataSet.addSeries(series1);
    }


}
