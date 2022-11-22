package com.mycompany.sptrack.data.logger;

import com.github.britooo.looca.api.core.Looca;

public class MemoriaRAM {
    private Looca looca;

    public MemoriaRAM(Looca looca) {
        this.looca = looca;
    }

    public Long getMemoriaRAMUso() {
        return this.looca.getMemoria().getEmUso();
    }
    
    public Long getTotalMemoria(){
        return this.looca.getMemoria().getDisponivel() + this.looca.getMemoria().getEmUso();
    }
}
