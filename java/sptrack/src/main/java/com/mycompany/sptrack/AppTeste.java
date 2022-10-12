
package com.mycompany.sptrack;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.processador.Processador;

public class AppTeste {
    public static void main(String[] args) {
        Looca looca = new Looca();
        Processador processador = looca.getProcessador();
        System.out.printf("%s", processador.getUso());
    }
}
