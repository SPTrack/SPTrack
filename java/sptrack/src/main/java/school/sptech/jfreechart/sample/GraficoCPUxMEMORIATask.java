package school.sptech.jfreechart.sample;



import school.sptech.jfreechart.sample.GraficoCPUxMEMORIA;
import java.util.TimerTask;

// Tarefa de atualização do gráfico de linha
public class GraficoCPUxMEMORIATask extends TimerTask{
  
  private GraficoCPUxMEMORIA graficoLinha;

  public GraficoCPUxMEMORIATask(GraficoCPUxMEMORIA graficoLinha) {
    this.graficoLinha = graficoLinha;
  }

  @Override
  public void run() {
    graficoLinha.atualizarDataSet();
  }
  
}
