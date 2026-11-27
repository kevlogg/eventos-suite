const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const docsDir = path.join(__dirname, 'docs');
const tempDir = path.join(docsDir, 'temp_pdf');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// -------------------------------------------------------------
// 1. ONE PAGER HTML
// -------------------------------------------------------------
const onePagerHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>One-Pager Ejecutivo - Eventos Kronitt</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    
    @page {
      size: A4 portrait;
      margin: 12mm 14mm;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background-color: #0b0f19;
      color: #f1f5f9;
      line-height: 1.35;
      font-size: 11.5px;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 14px;
      border-bottom: 1.5px solid rgba(255, 255, 255, 0.12);
      margin-bottom: 14px;
    }
    
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .brand-icon {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    
    .brand-name {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #ffffff;
    }
    
    .brand-sub {
      font-size: 10px;
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .badge {
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid rgba(99, 102, 241, 0.35);
      color: #c7d2fe;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .hero {
      margin-bottom: 14px;
    }
    
    .hero h1 {
      font-size: 20px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 4px;
      line-height: 1.2;
    }
    
    .hero h1 span {
      background: linear-gradient(90deg, #818cf8, #c084fc, #f472b6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .hero p {
      color: #cbd5e1;
      font-size: 11px;
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 14px;
    }
    
    .service-card {
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 12px;
    }
    
    .service-card.card-amber { border-top: 3px solid #f59e0b; }
    .service-card.card-purple { border-top: 3px solid #a855f7; }
    .service-card.card-pink { border-top: 3px solid #ec4899; }
    
    .service-title {
      font-size: 12px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 4px;
    }
    
    .service-desc {
      font-size: 10px;
      color: #94a3b8;
      margin-bottom: 8px;
      line-height: 1.3;
    }
    
    .service-bullets {
      list-style: none;
    }
    
    .service-bullets li {
      font-size: 9.5px;
      color: #cbd5e1;
      margin-bottom: 3px;
      padding-left: 10px;
      position: relative;
    }
    
    .service-bullets li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #818cf8;
      font-weight: bold;
    }
    
    .section-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #e2e8f0;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
      font-size: 10px;
      background: #111827;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    
    th {
      background: rgba(255, 255, 255, 0.05);
      padding: 7px 10px;
      text-align: left;
      font-weight: 700;
      color: #94a3b8;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 9.5px;
      text-transform: uppercase;
    }
    
    td {
      padding: 6px 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: #cbd5e1;
    }
    
    tr:last-child td {
      border-bottom: none;
    }
    
    .highlight-td {
      color: #a5b4fc;
      font-weight: 600;
    }
    
    .models-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 14px;
    }
    
    .model-card {
      background: #111827;
      border: 1px solid rgba(99, 102, 241, 0.25);
      border-radius: 10px;
      padding: 10px 12px;
    }
    
    .model-title {
      font-size: 11px;
      font-weight: 700;
      color: #818cf8;
      margin-bottom: 3px;
    }
    
    .model-desc {
      font-size: 9.5px;
      color: #94a3b8;
    }
    
    .footer-box {
      background: linear-gradient(90deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.12));
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 12px;
      padding: 10px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .footer-text h3 {
      font-size: 12px;
      font-weight: 800;
      color: #ffffff;
    }
    
    .footer-text p {
      font-size: 10px;
      color: #cbd5e1;
    }
    
    .contact-badge {
      background: #25D366;
      color: #052e16;
      font-weight: 800;
      font-size: 11px;
      padding: 6px 14px;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <div class="brand-icon">✨</div>
      <div>
        <div class="brand-name">EVENTOS KRONITT</div>
        <div class="brand-sub">Tecnología Interactiva para Eventos</div>
      </div>
    </div>
    <div class="badge">Ficha Comercial B2B</div>
  </div>

  <div class="hero">
    <h1>Soluciones Tecnológicas para <span>Salones & Event Planners</span></h1>
    <p>Suite web integral que moderniza la experiencia de tus fiestas en tres fases: antes, durante y después del evento. Cero descargas, solución llave en mano y comisiones directas.</p>
  </div>

  <div class="services-grid">
    <div class="service-card card-amber">
      <div class="service-title">01. Invitaciones & RSVP</div>
      <div class="service-desc">Sobre virtual 3D, música y confirmación en tiempo real.</div>
      <ul class="service-bullets">
        <li>Filtro de dietas (celíacos, veganos) para catering.</li>
        <li>Geolocalización directa con Google Maps y Waze.</li>
        <li>Cofre de regalos con CBU en 1 clic.</li>
        <li>Ahorro total de imprenta tradicional.</li>
      </ul>
    </div>

    <div class="service-card card-purple">
      <div class="service-title">02. Trivia Fiesta en Vivo</div>
      <div class="service-desc">El show interactivo para animar la cena en pantalla LED.</div>
      <ul class="service-bullets">
        <li>Los invitados juegan desde su móvil con QR.</li>
        <li>Preguntas personalizadas sobre la pareja/homenajeado.</li>
        <li>Podio animado en TV con lluvia de confeti.</li>
        <li>Elimina momentos muertos en la fiesta.</li>
      </ul>
    </div>

    <div class="service-card card-pink">
      <div class="service-title">03. Mural de Fotos QR</div>
      <div class="service-desc">Transmisión instantánea de fotos a pantalla gigante.</div>
      <ul class="service-bullets">
        <li>Identificador con código QR en cada mesa.</li>
        <li>Fotos y dedicatorias proyectadas al instante.</li>
        <li>Panel de moderación en vivo con filtro de seguridad.</li>
        <li>Descarga ZIP en alta resolución al finalizar.</li>
      </ul>
    </div>
  </div>

  <div class="section-title">📊 Comparativa: Tradicional vs. Experiencia Kronitt</div>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Dimensión</th>
        <th style="width: 35%;">Formato Tradicional</th>
        <th style="width: 40%;">Experiencia Kronitt</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Invitaciones</strong></td>
        <td>Tarjetas de papel costosas o PDF estático.</td>
        <td class="highlight-td">Web 3D interactiva, música, GPS y dietas en vivo.</td>
      </tr>
      <tr>
        <td><strong>Durante la Cena</strong></td>
        <td>Tiempos muertos entre platos, invitados dispersos.</td>
        <td class="highlight-td">Trivia en pantalla gigante: juego colectivo contra reloj.</td>
      </tr>
      <tr>
        <td><strong>Fotografía</strong></td>
        <td>Selfies individuales que nunca se comparten.</td>
        <td class="highlight-td">QR por mesa: proyección en vivo y descarga ZIP completa.</td>
      </tr>
      <tr>
        <td><strong>Implementación</strong></td>
        <td>Descarga de apps pesadas o cableados complejos.</td>
        <td class="highlight-td">100% Web: Sin descargas ni registros. Compatible con HDMI.</td>
      </tr>
    </tbody>
  </table>

  <div class="section-title">🤝 Modelos de Alianza Comercial para Organizadores</div>
  <div class="models-grid">
    <div class="model-card">
      <div class="model-title">Modelo 1: Comisión por Recomendación (15% al 20%)</div>
      <div class="model-desc">Derivás el cliente a Kronitt, nosotros asesoramos, cobramos y operamos todo. Vos recibís una comisión fija por evento realizado sin carga de trabajo.</div>
    </div>
    <div class="model-card">
      <div class="model-title">Modelo 2: Tarifa Mayorista para Salones</div>
      <div class="model-desc">Integrás los servicios dentro de tus paquetes "Todo Incluido" o "Premium" con tarifa preferencial B2B. Vos definís tu propio precio de venta y margen.</div>
    </div>
  </div>

  <div class="footer-box">
    <div class="footer-text">
      <h3>¿Querés ver una demostración en vivo o recibir un kit de muestra?</h3>
      <p>Probá la experiencia en tu celular desde: <strong>eventos-suite.vercel.app/organizadores</strong></p>
    </div>
    <div class="contact-badge">WhatsApp: +54 9 223 585-1419</div>
  </div>
</body>
</html>`;

// -------------------------------------------------------------
// 2. DOSSIER B2B HTML (Multi-page document)
// -------------------------------------------------------------
const dossierHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Dossier Comercial B2B - Eventos Kronitt</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
    
    @page {
      size: A4 portrait;
      margin: 15mm 18mm;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background-color: #0b0f19;
      color: #f1f5f9;
      line-height: 1.45;
      font-size: 12px;
    }
    
    .page {
      page-break-after: always;
      min-height: 94vh;
      display: flex;
      flex-col;
      flex-direction: column;
      justify-content: space-between;
    }
    
    .page:last-child {
      page-break-after: avoid;
    }
    
    .cover-top {
      padding-top: 50px;
    }
    
    .tagline {
      display: inline-block;
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid rgba(99, 102, 241, 0.4);
      color: #a5b4fc;
      padding: 6px 14px;
      border-radius: 30px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 24px;
    }
    
    .cover-title {
      font-size: 42px;
      font-weight: 900;
      line-height: 1.1;
      color: #ffffff;
      margin-bottom: 18px;
    }
    
    .cover-title span {
      background: linear-gradient(135deg, #818cf8, #c084fc, #f472b6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .cover-desc {
      font-size: 15px;
      color: #94a3b8;
      max-width: 500px;
      line-height: 1.5;
      margin-bottom: 40px;
    }
    
    .cover-pillars {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin-top: 40px;
    }
    
    .pillar-box {
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 16px;
      border-radius: 14px;
    }
    
    .pillar-num {
      font-size: 11px;
      font-weight: 800;
      color: #818cf8;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    
    .pillar-title {
      font-size: 14px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 6px;
    }
    
    .pillar-desc {
      font-size: 11px;
      color: #94a3b8;
      line-height: 1.35;
    }
    
    .cover-footer {
      padding-top: 30px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #64748b;
      font-size: 11px;
      font-weight: 600;
    }
    
    /* Page 2 & 3 styles */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 24px;
    }
    
    .page-title {
      font-size: 22px;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 4px;
    }
    
    .page-subtitle {
      font-size: 12px;
      color: #94a3b8;
      margin-bottom: 20px;
    }
    
    .service-detail-card {
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 18px 20px;
      margin-bottom: 16px;
    }
    
    .sd-amber { border-left: 4px solid #f59e0b; }
    .sd-purple { border-left: 4px solid #a855f7; }
    .sd-pink { border-left: 4px solid #ec4899; }
    
    .sd-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 8px;
    }
    
    .sd-title {
      font-size: 15px;
      font-weight: 800;
      color: #ffffff;
    }
    
    .sd-tag {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.08);
      color: #cbd5e1;
    }
    
    .sd-body {
      font-size: 11.5px;
      color: #cbd5e1;
      margin-bottom: 12px;
      line-height: 1.4;
    }
    
    .feature-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      background: rgba(0, 0, 0, 0.2);
      padding: 10px 14px;
      border-radius: 10px;
    }
    
    .feature-item {
      font-size: 10.5px;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .feature-item strong {
      color: #ffffff;
    }
    
    .b2b-benefit-box {
      margin-top: 10px;
      background: rgba(99, 102, 241, 0.1);
      border: 1px dashed rgba(99, 102, 241, 0.35);
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 11px;
      color: #c7d2fe;
    }
    
    .table-container {
      margin-bottom: 20px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      background: #111827;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    th {
      background: rgba(255, 255, 255, 0.06);
      padding: 10px 14px;
      text-align: left;
      font-weight: 700;
      color: #94a3b8;
      font-size: 10px;
      text-transform: uppercase;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    td {
      padding: 9px 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: #cbd5e1;
    }
    
    .cta-card {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.15));
      border: 1.5px solid rgba(99, 102, 241, 0.4);
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      margin-top: 10px;
    }
    
    .cta-card h3 {
      font-size: 18px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 6px;
    }
    
    .cta-card p {
      font-size: 12px;
      color: #cbd5e1;
      max-width: 480px;
      margin: 0 auto 16px auto;
    }
    
    .cta-btn {
      display: inline-block;
      background: #25D366;
      color: #064e3b;
      font-weight: 800;
      font-size: 13px;
      padding: 10px 24px;
      border-radius: 10px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <!-- PAGE 1: COVER -->
  <div class="page">
    <div class="cover-top">
      <div class="tagline">Dossier Comercial B2B · Alianzas 2026</div>
      <h1 class="cover-title">
        Tecnología interactiva para<br>
        <span>eventos inolvidables</span>
      </h1>
      <p class="cover-desc">
        La plataforma web integral que digitaliza las fiestas en tiempo real. Invitaciones 3D, trivias en pantallas gigantes y mural rotativo de fotos por QR para salones y wedding planners.
      </p>

      <div class="cover-pillars">
        <div class="pillar-box">
          <div class="pillar-num">Fase 1 · Antes</div>
          <div class="pillar-title">Invitación & RSVP</div>
          <div class="pillar-desc">Sobre virtual, música, GPS y confirmación con dietas especiales para el catering.</div>
        </div>

        <div class="pillar-box">
          <div class="pillar-num">Fase 2 · Durante</div>
          <div class="pillar-title">Trivia Fiesta en Vivo</div>
          <div class="pillar-desc">Show interactivo donde los invitados juegan con su celular y compiten por un podio LED.</div>
        </div>

        <div class="pillar-box">
          <div class="pillar-num">Fase 3 · Después</div>
          <div class="pillar-title">Mural de Fotos QR</div>
          <div class="pillar-desc">Transmisión al instante a pantallas y descarga de todas las fotos en alta resolución (.ZIP).</div>
        </div>
      </div>
    </div>

    <div class="cover-footer">
      <div>EVENTOS KRONITT · SUITE TECNOLÓGICA B2B</div>
      <div>WhatsApp: +54 9 223 585-1419 · eventos-suite.vercel.app</div>
    </div>
  </div>

  <!-- PAGE 2: SERVICIOS EN DETALLE -->
  <div class="page">
    <div>
      <div class="page-header">
        <div>
          <div class="page-title">Los 3 Servicios Interactivos</div>
          <div class="brand-sub">Detalle de funcionalidades y valor para el organizador</div>
        </div>
        <div class="tagline" style="margin: 0;">Página 02</div>
      </div>

      <!-- SERVICIO 1 -->
      <div class="service-detail-card sd-amber">
        <div class="sd-header">
          <div class="sd-title">01. Invitaciones Digitales Interactivas & RSVP</div>
          <div class="sd-tag">Pre-Evento</div>
        </div>
        <div class="sd-body">
          Reemplaza las tarjetas de papel o PDFs planos por una experiencia inmersiva con sobre virtual 3D, sello de lacre, música y animación temática. Los invitados confirman asistencia en segundos.
        </div>
        <div class="feature-list">
          <div class="feature-item"><strong>Catering:</strong> Desglose de celíacos, veganos y menúes.</div>
          <div class="feature-item"><strong>Geolocalización:</strong> 1 toque a Google Maps / Waze.</div>
          <div class="feature-item"><strong>Cofre de Regalos:</strong> Copia de CBU/Alias en 1 clic.</div>
          <div class="feature-item"><strong>Panel Organizador:</strong> Control de confirmados en vivo.</div>
        </div>
        <div class="b2b-benefit-box">
          💡 <strong>Beneficio para el Salón/Planner:</strong> Ahorra hasta 15 horas de coordinación telefónica y entrega la lista de comensales exacta a cocina.
        </div>
      </div>

      <!-- SERVICIO 2 -->
      <div class="service-detail-card sd-purple">
        <div class="sd-header">
          <div class="sd-title">02. Trivia Fiesta en Vivo (Show en Pantallas LED)</div>
          <div class="sd-tag">Durante la Fiesta</div>
        </div>
        <div class="sd-body">
          Transforma la cena o recepción en un programa de televisión. Los invitados escanean un QR gigante en pantalla o en sus mesas y responden preguntas contra reloj desde sus smartphones.
        </div>
        <div class="feature-list">
          <div class="feature-item"><strong>Cero Apps:</strong> Juegan directo desde el navegador.</div>
          <div class="feature-item"><strong>Podio en TV:</strong> Animación con confeti y ranking.</div>
          <div class="feature-item"><strong>Personalizada:</strong> Anécdotas de novios o empresa.</div>
          <div class="feature-item"><strong>Interacción:</strong> Dinamismo asegurado durante la cena.</div>
        </div>
        <div class="b2b-benefit-box">
          💡 <strong>Beneficio para el Salón/Planner:</strong> Elimina los baches de tiempo entre platos y genera un clímax de diversión sin contratar animación externa.
        </div>
      </div>

      <!-- SERVICIO 3 -->
      <div class="service-detail-card sd-pink">
        <div class="sd-header">
          <div class="sd-title">03. Mural de Fotos Dinámicas por QR</div>
          <div class="sd-tag">Durante y Post-Evento</div>
        </div>
        <div class="sd-body">
          Identificador exclusivo con código QR en cada mesa. Los invitados sacan selfies y dedicatorias que se proyectan en pantalla gigante en cuestión de segundos con transiciones elegantes.
        </div>
        <div class="feature-list">
          <div class="feature-item"><strong>QR por Mesa:</strong> Escaneo nativo instantáneo.</div>
          <div class="feature-item"><strong>Moderación:</strong> Filtro previo anti-desubicados.</div>
          <div class="feature-item"><strong>Rotación TV:</strong> Visual moderno para proyectores.</div>
          <div class="feature-item"><strong>Descarga ZIP:</strong> Álbum digital completo en alta resolución.</div>
        </div>
        <div class="b2b-benefit-box">
          💡 <strong>Beneficio para el Salón/Planner:</strong> Justifica la inversión audiovisual del salón y regala a los anfitriones recuerdos genuinos que el fotógrafo no llega a ver.
        </div>
      </div>
    </div>

    <div class="cover-footer">
      <div>EVENTOS KRONITT · DOSSIER B2B</div>
      <div>Página 02 de 03</div>
    </div>
  </div>

  <!-- PAGE 3: MODELOS DE ALIANZA & ESPECIFICACIONES TÉCNICAS -->
  <div class="page">
    <div>
      <div class="page-header">
        <div>
          <div class="page-title">Modelos de Alianza & Simplicidad Técnica</div>
          <div class="brand-sub">Cómo ganamos juntos y cómo se implementa en tu salón</div>
        </div>
        <div class="tagline" style="margin: 0;">Página 03</div>
      </div>

      <div class="section-title">🛠️ Tranquilidad Operativa para Salones y Técnicos</div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th style="width: 30%;">Aspecto</th>
              <th style="width: 70%;">Garantía y Especificación Kronitt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Instalación</strong></td>
              <td>100% Web. No requiere instalar software ni descargar apps.</td>
            </tr>
            <tr>
              <td><strong>Conectividad</strong></td>
              <td>Funciona con Wi-Fi estándar o datos 4G (las fotos se comprimen en el móvil).</td>
            </tr>
            <tr>
              <td><strong>Pantallas del Salón</strong></td>
              <td>Compatible con cualquier Smart TV, pantalla LED o proyector con conexión HDMI.</td>
            </tr>
            <tr>
              <td><strong>Soporte Técnico</strong></td>
              <td>Kronitt entrega los links listos para proyectar y los archivos de QR listos para imprimir.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="section-title">🤝 Esquemas de Monetización para Organizadores</div>
      <div class="feature-list" style="grid-template-columns: 1fr; margin-bottom: 16px; padding: 14px;">
        <div style="margin-bottom: 8px;">
          <strong style="color: #818cf8; font-size: 13px;">Modelo 1: Comisión por Recomendación (15% al 20%)</strong>
          <p style="color: #cbd5e1; font-size: 11px; margin-top: 3px;">
            Vos recomendás Eventos Kronitt a tus clientes. Nosotros nos encargamos del asesoramiento, cobro, configuración y soporte, y vos recibís tu comisión directa por evento cerrado. Cero trabajo para tu equipo.
          </p>
        </div>
        <div>
          <strong style="color: #c084fc; font-size: 13px;">Modelo 2: Tarifa Mayorista para Salones (Paquetes All-Inclusive)</strong>
          <p style="color: #cbd5e1; font-size: 11px; margin-top: 3px;">
            El salón integra la tecnología dentro de sus presupuestos o combos premium. Facturamos al salón con tarifa preferencial B2B y vos decidís el margen de ganancia hacia el cliente final.
          </p>
        </div>
      </div>

      <div class="cta-card">
        <h3>¿Querés activar una alianza o probar un evento piloto?</h3>
        <p>Agendemos una breve llamada de 10 minutos o pedí tu kit de muestra con carteles QR para exhibir en tu salón.</p>
        <div class="contact-badge" style="font-size: 13px; padding: 8px 18px;">
          WhatsApp Comercial: +54 9 223 585-1419
        </div>
      </div>
    </div>

    <div class="cover-footer">
      <div>EVENTOS KRONITT · DOSSIER B2B</div>
      <div>Página 03 de 03</div>
    </div>
  </div>
</body>
</html>`;

// -------------------------------------------------------------
// 3. PLAYBOOK COMERCIAL HTML
// -------------------------------------------------------------
const playbookHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Playbook Comercial B2B - Eventos Kronitt</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    
    @page {
      size: A4 portrait;
      margin: 14mm 16mm;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background-color: #0b0f19;
      color: #f1f5f9;
      line-height: 1.4;
      font-size: 11.5px;
    }
    
    .page {
      page-break-after: always;
      min-height: 94vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    .page:last-child {
      page-break-after: avoid;
    }
    
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 16px;
    }
    
    .page-title {
      font-size: 18px;
      font-weight: 800;
      color: #ffffff;
    }
    
    .badge {
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid rgba(99, 102, 241, 0.35);
      color: #c7d2fe;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 700;
    }
    
    .script-box {
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      padding: 14px;
      margin-bottom: 14px;
    }
    
    .script-target {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      color: #818cf8;
      margin-bottom: 6px;
    }
    
    .script-content {
      background: rgba(0, 0, 0, 0.3);
      padding: 10px 12px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 10px;
      color: #e2e8f0;
      line-height: 1.45;
      white-space: pre-wrap;
    }
    
    .step-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 16px;
    }
    
    .step-item {
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 10px 14px;
      display: flex;
      gap: 12px;
    }
    
    .step-num {
      width: 24px;
      height: 24px;
      background: #818cf8;
      color: #0b0f19;
      border-radius: 50%;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      flex-shrink: 0;
    }
    
    .step-text strong {
      display: block;
      color: #ffffff;
      font-size: 11.5px;
      margin-bottom: 2px;
    }
    
    .step-text p {
      font-size: 10.5px;
      color: #94a3b8;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10.5px;
      background: #111827;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 14px;
    }
    
    th {
      background: rgba(255, 255, 255, 0.06);
      padding: 8px 12px;
      text-align: left;
      font-weight: 700;
      color: #94a3b8;
      font-size: 9.5px;
      text-transform: uppercase;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    td {
      padding: 8px 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: #cbd5e1;
    }
    
    .footer {
      padding-top: 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      color: #64748b;
      font-size: 10px;
    }
  </style>
</head>
<body>
  <!-- PAGE 1: PROSPECCIÓN & PITCH -->
  <div class="page">
    <div>
      <div class="page-header">
        <div class="page-title">Playbook de Ventas B2B · Eventos Kronitt</div>
        <div class="badge">Uso Interno Comercial</div>
      </div>

      <div class="script-box">
        <div class="script-target">1. WhatsApp / Instagram para Salones de Fiestas</div>
        <div class="script-content">"Hola [Nombre], ¿cómo estás? Te escribe [Tu Nombre] de Eventos Kronitt.
Estuve viendo los eventos increíbles que hacen en [Nombre del Salón] y quería consultarte algo rápido:
¿Tienen actualmente algún sistema interactivo para que los invitados jueguen desde sus celulares y proyecten fotos en vivo en sus pantallas durante la cena?

Desarrollamos una plataforma web interactiva llave en mano (Trivia en vivo, Mural de fotos por QR e Invitaciones RSVP) que muchos salones están sumando a sus paquetes premium o recomendando con comisión directa.

Los invitados no descargan ninguna app. Te comparto un enlace demo de 30 segundos para que pruebes cómo funciona desde tu celular: 👉 [Link a eventos-suite.vercel.app/organizadores]

Si te parece, te cuento en 5 minutos cómo podemos implementarlo en un evento de prueba sin costo para el salón. ¿Te gustaría ver cómo funciona?"</div>
      </div>

      <div class="script-box">
        <div class="script-target">2. WhatsApp / Instagram para Wedding Planners</div>
        <div class="script-content">"¡Hola [Nombre]! Sigo tu trabajo organizando eventos, impecable la dedicación que le ponés a cada detalle.
Te escribo porque creamos Eventos Kronitt, una herramienta diseñada justamente para solucionar dos dolores de cabeza típicos de las planners:
1. El desorden con el catering: Formulario RSVP interactivo con reporte en vivo de confirmados y dietas especiales.
2. Momentos estáticos en la cena: Trivia en vivo en pantalla gigante y mural de fotos rotativo por QR.

Lo mejor: los invitados no descargan nada y vos como planner podés monetizarlo con comisión por evento o integrarlo a tu propuesta de valor para cerrar clientes indecisos.
Te dejo el demo para que lo chusmees en 1 minuto: 👉 [Link a /organizadores]"</div>
      </div>

      <div class="script-target" style="margin-top: 14px;">Estructura de Reunión o Videollamada (15 Minutos)</div>
      <div class="step-list">
        <div class="step-item">
          <div class="step-num">1</div>
          <div class="step-text">
            <strong>Diagnóstico & Empatía (3 min)</strong>
            <p>"¿Cómo manejan hoy la confirmación de invitados y los momentos de bache en la cena?"</p>
          </div>
        </div>
        <div class="step-item">
          <div class="step-num">2</div>
          <div class="step-text">
            <strong>Demostración en su Celular (5 min)</strong>
            <p>Hacer que el organizador escanee los QR de la web /organizadores y viva la experiencia.</p>
          </div>
        </div>
        <div class="step-item">
          <div class="step-num">3</div>
          <div class="step-text">
            <strong>Propuesta & Cierre Piloto (7 min)</strong>
            <p>Explicar la comisión (15-20%) o tarifa de salón y ofrecer el primer evento bonificado.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div>PLAYBOOK COMERCIAL · EVENTOS KRONITT</div>
      <div>Página 01 de 02</div>
    </div>
  </div>

  <!-- PAGE 2: REENVÍO A CLIENTES & OBJECIONES -->
  <div class="page">
    <div>
      <div class="page-header">
        <div class="page-title">Textos de Reenvío & Manejo de Objeciones</div>
        <div class="badge">Herramientas de Cierre</div>
      </div>

      <div class="script-box">
        <div class="script-target">Mensaje listo para que el Planner/Salón reenvíe a Novios</div>
        <div class="script-content">"¡Hola chicos! Pensando en su boda, les quería compartir un servicio interactivo espectacular que estamos trabajando para que la fiesta sea inolvidable:
💌 Invitación Digital de Lujo: Con sobre virtual interactivo, música, mapa GPS y confirmación con dietas para el catering.
🏆 Trivia de la Pareja en Vivo: Un show en pantalla gigante durante la cena donde los invitados juegan con su celular respondiendo anécdotas sobre ustedes.
📸 Mural de Fotos en Pantalla: Cada mesa tiene su QR para sacar selfies y dedicatorias que se proyectan en vivo. Al final, se descargan todas las fotos en alta resolución.

Miren este link para probarlo: [Link Demo]
¿Les gustaría que lo sumemos a la propuesta de su evento?"</div>
      </div>

      <div class="script-target" style="margin-top: 14px;">Matriz de Manejo de Objeciones</div>
      <table>
        <thead>
          <tr>
            <th style="width: 35%;">Objeción</th>
            <th style="width: 65%;">Respuesta Profesional Recomendada</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>"La señal de internet en el salón no es buena."</strong></td>
            <td>El sistema comprime las fotos en el propio teléfono antes de subirlas y las trivias consumen menos de 100 KB. Funciona fluido con cualquier Wi-Fi básico o 4G.</td>
          </tr>
          <tr>
            <td><strong>"¿Y si alguien sube una foto desubicada?"</strong></td>
            <td>Tenemos Panel de Moderación en Vivo con aprobación previa obligatoria si lo desean. Ninguna foto sale a pantalla sin autorización.</td>
          </tr>
          <tr>
            <td><strong>"¿Los adultos mayores saben usarlo?"</strong></td>
            <td>No requiere descargar ninguna app ni crear contraseñas. Solo abren la cámara del celular y apuntan al código QR de la mesa.</td>
          </tr>
          <tr>
            <td><strong>"Presupuesto ajustado de los clientes."</strong></td>
            <td>Se puede contratar por módulos individuales (solo la Trivia o solo la Invitación) y la invitación ahorra el costo total de imprenta tradicional.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer">
      <div>PLAYBOOK COMERCIAL · EVENTOS KRONITT</div>
      <div>Página 02 de 02</div>
    </div>
  </div>
</body>
</html>`;

// Write HTML files
const onePagerPath = path.join(tempDir, 'one_pager.html');
const dossierPath = path.join(tempDir, 'dossier.html');
const playbookPath = path.join(tempDir, 'playbook.html');

fs.writeFileSync(onePagerPath, onePagerHtml, 'utf8');
fs.writeFileSync(dossierPath, dossierHtml, 'utf8');
fs.writeFileSync(playbookPath, playbookHtml, 'utf8');

// Output PDF paths
const onePagerPdf = path.join(docsDir, 'ONE_PAGER_EVENTOS_KRONITT.pdf');
const dossierPdf = path.join(docsDir, 'DOSSIER_COMERCIAL_EVENTOS_KRONITT.pdf');
const playbookPdf = path.join(docsDir, 'PLAYBOOK_VENTAS_EVENTOS_KRONITT.pdf');

console.log('Generating PDFs with Chrome Headless...');

function convertToPdf(htmlFile, outputFile) {
  const cmd = `"${chromePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${outputFile}" "${htmlFile}"`;
  execSync(cmd, { stdio: 'inherit' });
  console.log(`Generated: ${outputFile}`);
}

try {
  convertToPdf(onePagerPath, onePagerPdf);
  convertToPdf(dossierPath, dossierPdf);
  convertToPdf(playbookPath, playbookPdf);
  console.log('All PDFs generated successfully!');
} catch (err) {
  console.error('Error generating PDFs:', err);
  process.exit(1);
}
