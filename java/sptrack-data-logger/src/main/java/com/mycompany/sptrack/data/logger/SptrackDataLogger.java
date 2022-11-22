package com.mycompany.sptrack.data.logger;

import com.github.britooo.looca.api.core.Looca;

public class SptrackDataLogger {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("Passo 1 - Fazer o Java se comunicar com a API Looca");
        System.out.println("Passo 2 - Conectar no MySQL Local!");
        System.out.println("Passo 3 - Conectar no SQL SERVER!");
        System.out.println("Passo 4 - Pegar o endereço Mac!");
        System.out.println("Passo 5 - Criar verificações");
        System.out.println("Passo 6 - Inserções");
        System.out.println("Passo 7 - Projeto Individual");
    
        Looca looca = new Looca();
        
        Processador cpu = new Processador(looca);
        MemoriaRAM ram = new MemoriaRAM(looca);
        
        Double totalRAMclasse = ram.getTotalMemoria() / (Math.pow(1024, 3));
        System.out.println(totalRAMclasse);
        String totalRAMstring = String.format("%.3f", totalRAMclasse);
        Double totalRAM = Double.valueOf(totalRAMstring);
        
        int i = 0;
        while(i < 100){
            System.out.println(String.format("CPU: %.2f%%", cpu.getProcessadorUso()));
            System.out.println(ram.getMemoriaRAMUso());
            Thread.sleep(500);
            i++;
        }
    }
}
