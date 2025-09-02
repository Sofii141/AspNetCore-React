import React from "react";

type Props = {};

const DesignGuide = (props: Props) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>
        Design Guide
      </h1>
      <p>
        Esta página se puede usar para probar componentes reutilizables de la aplicación.
      </p>
      {/* 
        Aquí podrías añadir instancias de tus componentes funcionales
        como <Card />, <Search />, etc., con datos de prueba para ver cómo se ven.
      */}
    </div>
  );
};

export default DesignGuide;