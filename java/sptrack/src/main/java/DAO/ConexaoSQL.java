
package DAO;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JOptionPane;


public class ConexaoSQL {
    
      public Connection conectaSQL (){
//         declaramos uma variavel tipo conn 
    Connection conn = null;
    
    
//   o metodo vai tentar fazer o que estiver aqui dentro
         try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver"); 
             String url = "jdbc:sqlserver://sptrack.database.windows.net:1433;database=SPTrack;user=sptrackClient@sptrack;password=Sprint2SPTrack;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";
//            variavel recebera o conteudo da url
             conn = DriverManager.getConnection(url);
  
// qualquer problema entra na exception            
         } catch (SQLException erro) {
             JOptionPane.showMessageDialog(null, "conexaoSQL" + erro.getMessage());
         } catch (ClassNotFoundException ex) {
              Logger.getLogger(ConexaoSQL.class.getName()).log(Level.SEVERE, null, ex);
          }
    
         return conn;
    }
    
    
}
