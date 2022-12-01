package school.sptech.jfreechart.sample;



import school.sptech.jfreechart.sample.GraficoCPUxMEMORIA;
import java.util.TimerTask;

// Tarefa de atualização do gráfico de linha
public class GraficoCPUxTEMPERATURATask extends TimerTask{
  
  private GraficoCPUxTEMPERATURA graficoLinha;

  public GraficoCPUxTEMPERATURATask(GraficoCPUxTEMPERATURA graficoLinha) {
    this.graficoLinha = graficoLinha;
  }


  @Override
  public void run() {
    graficoLinha.atualizarDataSet();
  }
  
}
