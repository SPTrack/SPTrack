
package DAO;
//importação do sql
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

//importação do JOptioPane
import javax.swing.JOptionPane;

//classe
public class ConexaoDAO {
//metodo chamado conectaBD
     public Connection conectaBD (){
//         declaramos uma variavel tipo conn 
    Connection conn = null;
    
//   o metodo vai tentar fazer o que estiver aqui dentro
         try {
             String url = "jdbc:mysql://localhost:3306/SPTrack?user=sptrackClient&password=urubu100";
//            variavel recebera o conteudo da url
             conn = DriverManager.getConnection(url);
  
// qualquer problema entra na exceptio            
         } catch (SQLException erro) {
             JOptionPane.showMessageDialog(null, "conexaoDAO" + erro.getMessage());
         }
    
         return conn;
    }
    
}
