package com.mycompany.sptrack.data.logger;

import com.github.britooo.looca.api.core.Looca;

public class Processador {
    private Looca looca;

    public Processador(Looca looca) {
        this.looca = looca;
    }

    public Double getProcessadorUso() {
        return this.looca.getProcessador().getUso();
    }
}
