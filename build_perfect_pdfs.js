const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const docsDir = path.join(__dirname, 'docs');
const publicDocsDir = path.join(__dirname, 'public', 'docs');
const tempDir = path.join(docsDir, 'temp_pdf_src');

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
if (!fs.existsSync(publicDocsDir)) fs.mkdirSync(publicDocsDir, { recursive: true });

// Common CSS: High-contrast, bold, clear typography, full-bleed A4
const commonCss = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&display=swap');
  
  @page {
    size: A4 portrait;
    margin: 0;
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  html, body {
    width: 210mm;
    margin: 0;
    padding: 0;
    background-color: #060813;
    color: #ffffff;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  
  .page {
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    page-break-after: always;
    page-break-inside: avoid;
    box-sizing: border-box;
    padding: 14mm 16mm 12mm 16mm;
    background-color: #060813;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }
  
  .page:last-child {
    page-break-after: avoid;
  }

  .bg-glow {
    position: absolute;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(95px);
    opacity: 0.18;
    z-index: 0;
  }
  .glow-purple { top: -80px; right: -80px; background: #9333ea; }
  .glow-pink { bottom: -100px; left: -100px; background: #ec4899; }
  .glow-indigo { top: 40%; left: -100px; background: #4f46e5; }

  .content-layer {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }

  /* Header */
  .header-brand {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 11px;
    border-bottom: 1.5px solid rgba(255, 255, 255, 0.14);
  }
  
  .brand-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .brand-logo {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
  }
  
  .brand-logo svg {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: #ffffff;
    stroke-width: 2.2;
  }
  
  .brand-name {
    font-size: 17px;
    font-weight: 900;
    letter-spacing: -0.3px;
    color: #ffffff;
    line-height: 1.15;
  }
  
  .brand-sub {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #cbd5e1;
  }
  
  .badge-tag {
    background: rgba(99, 102, 241, 0.2);
    border: 1.5px solid rgba(99, 102, 241, 0.5);
    color: #e0e7ff;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  /* Footer */
  .footer-bar {
    padding-top: 9px;
    border-top: 1.5px solid rgba(255, 255, 255, 0.12);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 10px;
    font-weight: 700;
    color: #cbd5e1;
  }
  .footer-bar strong {
    color: #ffffff;
    font-weight: 800;
  }
`;

// =========================================================================
// 1. ONE-PAGER EJECUTIVO (1 Sola Página A4, Full Bleed, 3 Modelos, Sin WSP)
// =========================================================================
const onePagerHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>One-Pager Ejecutivo - Eventos Kronitt</title>
  <style>
    ${commonCss}
    
    .hero-section {
      margin-top: 8px;
      margin-bottom: 11px;
    }
    
    .hero-title {
      font-size: 20px;
      font-weight: 900;
      line-height: 1.2;
      color: #ffffff;
      margin-bottom: 5px;
      letter-spacing: -0.4px;
    }
    
    .hero-title span {
      background: linear-gradient(90deg, #93c5fd 0%, #c084fc 50%, #f472b6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .hero-desc {
      font-size: 11.5px;
      color: #e2e8f0;
      font-weight: 600;
      line-height: 1.45;
    }
    
    /* 3 Services Grid */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 11px;
      margin-bottom: 12px;
    }
    
    .service-card {
      background: #0d1224;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 13px;
      padding: 13px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4);
    }
    
    .card-amber { border-top: 4px solid #f59e0b; }
    .card-purple { border-top: 4px solid #a855f7; }
    .card-pink { border-top: 4px solid #ec4899; }
    
    .svc-badge {
      display: inline-block;
      font-size: 9.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 4px;
    }
    .badge-amber { color: #fcd34d; }
    .badge-purple { color: #d8b4fe; }
    .badge-pink { color: #f9a8d4; }
    
    .svc-name {
      font-size: 13.5px;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 5px;
      line-height: 1.25;
    }
    
    .svc-summary {
      font-size: 10.5px;
      font-weight: 600;
      color: #e2e8f0;
      margin-bottom: 9px;
      line-height: 1.35;
    }
    
    .svc-items {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    
    .svc-items li {
      font-size: 10px;
      font-weight: 600;
      color: #f1f5f9;
      line-height: 1.35;
      display: flex;
      align-items: flex-start;
      gap: 6px;
    }
    
    .svc-items li svg {
      width: 13px;
      height: 13px;
      flex-shrink: 0;
      margin-top: 1px;
      stroke-width: 2.8;
    }
    .icon-amber { stroke: #fbbf24; }
    .icon-purple { stroke: #c084fc; }
    .icon-pink { stroke: #f472b6; }
    
    /* Section Headers */
    .block-header {
      font-size: 11.5px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #ffffff;
      margin-bottom: 7px;
      display: flex;
      align-items: center;
      gap: 7px;
    }
    
    .block-header svg {
      width: 14px;
      height: 14px;
      stroke: #818cf8;
      fill: none;
      stroke-width: 2.5;
    }
    
    /* Comparison Table */
    .table-box {
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 11px;
      overflow: hidden;
      margin-bottom: 12px;
      background: #0d1224;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10.5px;
    }
    
    th {
      background: #141c36;
      padding: 7px 12px;
      text-align: left;
      font-weight: 900;
      font-size: 9.8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #cbd5e1;
      border-bottom: 1.5px solid rgba(255, 255, 255, 0.12);
    }
    
    td {
      padding: 6.5px 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      color: #f1f5f9;
      font-weight: 600;
      line-height: 1.35;
    }
    
    tr:last-child td {
      border-bottom: none;
    }
    
    .td-highlight {
      color: #e0e7ff;
      font-weight: 700;
      background: rgba(99, 102, 241, 0.08);
    }
    
    /* 3 Commercial Models Grid */
    .models-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 11px;
    }
    
    .model-card-3 {
      background: #0d1224;
      border: 1px solid rgba(99, 102, 241, 0.35);
      border-radius: 12px;
      padding: 11px 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    .model-tag {
      font-size: 9px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      color: #93c5fd;
      margin-bottom: 3px;
    }
    
    .model-title {
      font-size: 11.5px;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 5px;
      line-height: 1.25;
    }
    
    .model-desc {
      font-size: 10px;
      font-weight: 600;
      color: #cbd5e1;
      line-height: 1.4;
    }
    
    .model-highlight {
      margin-top: 6px;
      padding-top: 5px;
      border-top: 1px dashed rgba(255, 255, 255, 0.12);
      font-size: 9.5px;
      font-weight: 800;
      color: #a5b4fc;
    }
    
    /* Bottom Strip */
    .demo-strip {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.22) 0%, rgba(168, 85, 247, 0.22) 100%);
      border: 1.5px solid rgba(99, 102, 241, 0.45);
      border-radius: 12px;
      padding: 10px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .demo-left h4 {
      font-size: 12px;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 2px;
    }
    
    .demo-left p {
      font-size: 10.5px;
      font-weight: 600;
      color: #e2e8f0;
    }
    
    .demo-url-badge {
      background: #4f46e5;
      color: #ffffff;
      font-size: 10.5px;
      font-weight: 800;
      padding: 6px 14px;
      border-radius: 8px;
      letter-spacing: 0.3px;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="bg-glow glow-purple"></div>
    <div class="bg-glow glow-pink"></div>
    
    <div class="content-layer">
      <!-- HEADER -->
      <div class="header-brand">
        <div class="brand-left">
          <div class="brand-logo">
            <svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/></svg>
          </div>
          <div>
            <div class="brand-name">EVENTOS KRONITT</div>
            <div class="brand-sub">Tecnología Interactiva para Eventos</div>
          </div>
        </div>
        <div class="badge-tag">Ficha Comercial B2B</div>
      </div>

      <!-- HERO -->
      <div class="hero-section">
        <h1 class="hero-title">Soluciones Tecnológicas para <span>Salones & Event Planners</span></h1>
        <p class="hero-desc">
          Suite web en tiempo real que digitaliza y llena de emoción cada fiesta en sus 3 etapas: <strong>Antes</strong> (Invitación & confirmación RSVP), <strong>Durante</strong> (Trivia en pantallas LED y fotos en vivo por QR) y <strong>Después</strong> (Descarga masiva de recuerdos en alta resolución).
        </p>
      </div>

      <!-- 3 SERVICES -->
      <div class="services-grid">
        <div class="service-card card-amber">
          <div>
            <span class="svc-badge badge-amber">Servicio 01 · Pre-Evento</span>
            <div class="svc-name">Invitaciones Digitales & RSVP</div>
            <div class="svc-summary">Sobre virtual 3D con música y confirmación en tiempo real.</div>
          </div>
          <ul class="svc-items">
            <li>
              <svg class="icon-amber" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span><strong>Filtro de dietas:</strong> celíacos, veganos y menúes para catering.</span>
            </li>
            <li>
              <svg class="icon-amber" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span><strong>GPS con 1 clic:</strong> llegada directa a Google Maps y Waze.</span>
            </li>
            <li>
              <svg class="icon-amber" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span><strong>Cofre de regalos:</strong> copia de CBU/Alias en el celular.</span>
            </li>
            <li>
              <svg class="icon-amber" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span><strong>Ahorro total</strong> de costos de imprenta tradicional.</span>
            </li>
          </ul>
        </div>

        <div class="service-card card-purple">
          <div>
            <span class="svc-badge badge-purple">Servicio 02 · Durante</span>
            <div class="svc-name">Trivia Fiesta en Vivo</div>
            <div class="svc-summary">Show interactivo durante la cena proyectado en pantalla LED.</div>
          </div>
          <ul class="svc-items">
            <li>
              <svg class="icon-purple" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span><strong>Cero descargas:</strong> juegan directo con la cámara del celu.</span>
            </li>
            <li>
              <svg class="icon-purple" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span><strong>Preguntas a medida:</strong> anécdotas de novios o empresa.</span>
            </li>
            <li>
              <svg class="icon-purple" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span><strong>Podio animado:</strong> ranking y confeti en pantalla gigante.</span>
            </li>
            <li>
              <svg class="icon-purple" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span><strong>Dinamismo total:</strong> elimina los baches entre platos.</span>
            </li>
          </ul>
        </div>

        <div class="service-card card-pink">
          <div>
            <span class="svc-badge badge-pink">Servicio 03 · Durante y Post</span>
            <div class="svc-name">Mural de Fotos por QR</div>
            <div class="svc-summary">Transmisión instantánea de fotos a la pantalla del salón.</div>
          </div>
          <ul class="svc-items">
            <li>
              <svg class="icon-pink" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span><strong>QR en cada mesa:</strong> fotos y dedicatorias al instante.</span>
            </li>
            <li>
              <svg class="icon-pink" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span><strong>Panel de moderación:</strong> filtro de seguridad en vivo.</span>
            </li>
            <li>
              <svg class="icon-pink" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span><strong>Rotación moderna:</strong> aprovecha la pantalla del salón.</span>
            </li>
            <li>
              <svg class="icon-pink" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span><strong>Descarga ZIP:</strong> álbum completo en alta resolución.</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- COMPARATIVE TABLE -->
      <div>
        <div class="block-header">
          <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
          <span>Comparativa: Evento Tradicional vs. Experiencia Kronitt</span>
        </div>
        <div class="table-box">
          <table>
            <thead>
              <tr>
                <th style="width: 24%;">Dimensión</th>
                <th style="width: 36%;">Formato Tradicional</th>
                <th style="width: 40%;">Experiencia Eventos Kronitt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Invitaciones</strong></td>
                <td>Tarjetas de papel costosas o PDF plano estático.</td>
                <td class="td-highlight">Web 3D interactiva, música, GPS y dietas en tiempo real.</td>
              </tr>
              <tr>
                <td><strong>Momento Cena</strong></td>
                <td>Tiempos muertos entre platos, invitados en silencio.</td>
                <td class="td-highlight">Trivia en pantalla gigante: todos juegan y compiten en vivo.</td>
              </tr>
              <tr>
                <td><strong>Fotos de Invitados</strong></td>
                <td>Selfies individuales que nunca se comparten.</td>
                <td class="td-highlight">QR por mesa: proyección inmediata y descarga ZIP completa.</td>
              </tr>
              <tr>
                <td><strong>Operatividad</strong></td>
                <td>Requiere apps pesadas o cableados complejos.</td>
                <td class="td-highlight">100% Web: Sin descargas ni registros. Compatible con HDMI.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 3 COMMERCIAL MODELS -->
      <div>
        <div class="block-header">
          <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span>Modelos de Comercialización & Alianza</span>
        </div>
        <div class="models-grid-3">
          <div class="model-card-3">
            <div>
              <div class="model-tag">1. Para Organizadores</div>
              <div class="model-title">Ganancia Escalada Mensual</div>
              <div class="model-desc">
                Comisión creciente según los servicios vendidos al mes. A mayor volumen de eventos cerrados, mayor es tu margen por fecha.
              </div>
            </div>
            <div class="model-highlight">
              📈 Escala: 15% · 20% · 25% + Bonos
            </div>
          </div>

          <div class="model-card-3">
            <div>
              <div class="model-tag">2. Para Salones de Fiesta</div>
              <div class="model-title">Paquetes Mensuales (Abono)</div>
              <div class="model-desc">
                Tarifa plana por paquete de fechas o cobertura ilimitada mensual para incluir tecnología en todas tus propuestas "All-Inclusive".
              </div>
            </div>
            <div class="model-highlight">
              🏢 Tarifa mayorista fija por mes
            </div>
          </div>

          <div class="model-card-3">
            <div>
              <div class="model-tag">3. Para Quien Festeja</div>
              <div class="model-title">Combos de Servicios</div>
              <div class="model-desc">
                Packs promocionales accesibles para familias y parejas: Pack Invitación, Pack Show (Trivia + Mural) o Full Suite con los 3 módulos.
              </div>
            </div>
            <div class="model-highlight">
              🎉 Ahorro al combinar servicios
            </div>
          </div>
        </div>
      </div>

      <!-- BOTTOM DEMO STRIP (SIN WHATSAPP) -->
      <div class="demo-strip">
        <div class="demo-left">
          <h4>¿Querés probar la experiencia en vivo desde tu smartphone?</h4>
          <p>Escaneá los códigos QR de demostración en el showroom interactivo.</p>
        </div>
        <div class="demo-url-badge">
          eventos-suite.vercel.app/organizadores
        </div>
      </div>

      <!-- FOOTER -->
      <div class="footer-bar">
        <div><strong>EVENTOS KRONITT</strong> · Suite de Experiencias Digitales para Eventos</div>
        <div>Showroom Interactivo: <strong>eventos-suite.vercel.app/organizadores</strong></div>
      </div>
    </div>
  </div>
</body>
</html>`;

// =========================================================================
// 2. DOSSIER B2B COMPLETO (2 Páginas A4, Sin Portada, 3 Modelos, Sin WSP)
// =========================================================================
const dossierHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Dossier Comercial B2B - Eventos Kronitt</title>
  <style>
    ${commonCss}
    
    .section-headline {
      margin-bottom: 14px;
    }
    
    .section-headline h2 {
      font-size: 21px;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 4px;
      letter-spacing: -0.4px;
    }
    
    .section-headline p {
      font-size: 11.5px;
      font-weight: 600;
      color: #cbd5e1;
    }
    
    .service-row-card {
      background: #0d1224;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      padding: 16px 20px;
      margin-bottom: 14px;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
    }
    
    .sr-amber { border-left: 5px solid #f59e0b; }
    .sr-purple { border-left: 5px solid #a855f7; }
    .sr-pink { border-left: 5px solid #ec4899; }
    
    .sr-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    
    .sr-title {
      font-size: 15px;
      font-weight: 900;
      color: #ffffff;
    }
    
    .sr-tag {
      font-size: 9.5px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      padding: 4px 10px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }
    
    .sr-body {
      font-size: 11.5px;
      font-weight: 600;
      color: #e2e8f0;
      line-height: 1.45;
      margin-bottom: 10px;
    }
    
    .feature-grid-mini {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 7px;
      background: rgba(0, 0, 0, 0.35);
      padding: 9px 14px;
      border-radius: 9px;
      margin-bottom: 9px;
    }
    
    .f-item {
      font-size: 10.5px;
      font-weight: 600;
      color: #cbd5e1;
    }
    .f-item strong {
      color: #ffffff;
      font-weight: 800;
    }
    
    .b2b-highlight {
      background: rgba(99, 102, 241, 0.12);
      border: 1px dashed rgba(99, 102, 241, 0.4);
      padding: 8px 14px;
      border-radius: 9px;
      font-size: 11px;
      font-weight: 700;
      color: #e0e7ff;
      line-height: 1.4;
    }
    
    /* Page 2 Specs & 3 Models */
    .specs-table-box {
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 16px;
      background: #0d1224;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
    }
    
    th {
      background: #141c36;
      padding: 9px 14px;
      text-align: left;
      font-weight: 900;
      font-size: 9.8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #cbd5e1;
      border-bottom: 1.5px solid rgba(255, 255, 255, 0.12);
    }
    
    td {
      padding: 9px 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: #f1f5f9;
      font-weight: 600;
      line-height: 1.4;
    }
    
    tr:last-child td { border-bottom: none; }
    
    .models-grid-dossier {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 11px;
      margin-bottom: 16px;
    }
    
    .m-card-dossier {
      background: #0d1224;
      border: 1px solid rgba(99, 102, 241, 0.35);
      border-radius: 12px;
      padding: 13px 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    .m-badge-dossier {
      font-size: 9px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      color: #93c5fd;
      margin-bottom: 4px;
    }
    
    .m-title-dossier {
      font-size: 12.5px;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 6px;
      line-height: 1.25;
    }
    
    .m-desc-dossier {
      font-size: 10.5px;
      font-weight: 600;
      color: #cbd5e1;
      line-height: 1.4;
      margin-bottom: 8px;
    }
    
    .m-callout-dossier {
      padding-top: 6px;
      border-top: 1px dashed rgba(255, 255, 255, 0.12);
      font-size: 10px;
      font-weight: 800;
      color: #a5b4fc;
    }
    
    .cta-strip-dossier {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.22) 0%, rgba(236, 72, 153, 0.22) 100%);
      border: 1.5px solid rgba(99, 102, 241, 0.45);
      border-radius: 14px;
      padding: 16px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    
    .cta-strip-dossier h3 {
      font-size: 15px;
      font-weight: 900;
      color: #ffffff;
    }
    
    .cta-strip-dossier p {
      font-size: 11.5px;
      font-weight: 600;
      color: #e2e8f0;
      max-width: 580px;
    }
    
    .cta-link-pill {
      background: #4f46e5;
      color: #ffffff;
      font-size: 11.5px;
      font-weight: 800;
      padding: 7px 18px;
      border-radius: 9px;
      margin-top: 4px;
      letter-spacing: 0.3px;
    }
  </style>
</head>
<body>
  <!-- PAGE 1: LOS 3 SERVICIOS DETALLADOS -->
  <div class="page">
    <div class="bg-glow glow-indigo"></div>
    <div class="bg-glow glow-purple"></div>
    
    <div class="content-layer">
      <div class="header-brand">
        <div class="brand-left">
          <div class="brand-logo">
            <svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/></svg>
          </div>
          <div>
            <div class="brand-name">EVENTOS KRONITT</div>
            <div class="brand-sub">Dossier de Servicios Interactivos</div>
          </div>
        </div>
        <div class="badge-tag">Página 01 de 02</div>
      </div>

      <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
        <div class="section-headline">
          <h2>Los 3 Servicios Interactivos en Detalle</h2>
          <p>Diseñados para elevar la experiencia del invitado y simplificar la gestión del organizador.</p>
        </div>

        <!-- SERVICE 1 -->
        <div class="service-row-card sr-amber">
          <div class="sr-header">
            <div class="sr-title">01. Invitaciones Digitales Interactivas & RSVP</div>
            <div class="sr-tag">Pre-Evento</div>
          </div>
          <div class="sr-body">
            Reemplaza las tarjetas de papel por una web inmersiva con sobre virtual 3D, música y animación temática. Los invitados confirman asistencia y detallan preferencias con un toque.
          </div>
          <div class="feature-grid-mini">
            <div class="f-item"><strong>Catering:</strong> Desglose de celíacos, veganos y menúes.</div>
            <div class="f-item"><strong>Geolocalización:</strong> 1 toque a Google Maps / Waze.</div>
            <div class="f-item"><strong>Cofre de Regalos:</strong> Copia de CBU/Alias en 1 clic.</div>
            <div class="f-item"><strong>Panel Organizador:</strong> Control de confirmados en vivo.</div>
          </div>
          <div class="b2b-highlight">
            💡 <strong>Valor para el Organizador:</strong> Ahorra hasta 15 horas de cruce manual de planillas y entrega la lista de comensales exacta a cocina sin errores de último momento.
          </div>
        </div>

        <!-- SERVICE 2 -->
        <div class="service-row-card sr-purple">
          <div class="sr-header">
            <div class="sr-title">02. Trivia Fiesta en Vivo (Show en Pantallas LED)</div>
            <div class="sr-tag">Durante la Fiesta</div>
          </div>
          <div class="sr-body">
            Convierte la cena en un programa de TV interactivo. Los invitados escanean el código QR desde la mesa y compiten respondiendo preguntas temáticas o personalizadas contra reloj.
          </div>
          <div class="feature-grid-mini">
            <div class="f-item"><strong>Cero Apps:</strong> Juegan directo desde el navegador móvil.</div>
            <div class="f-item"><strong>Podio en TV:</strong> Animación con confeti y ranking.</div>
            <div class="f-item"><strong>Personalización:</strong> Anécdotas de novios o empresa.</div>
            <div class="f-item"><strong>Interacción:</strong> Dinamismo y risas aseguradas.</div>
          </div>
          <div class="b2b-highlight">
            💡 <strong>Valor para el Organizador:</strong> Llena los baches entre platos o el postre, logrando que los invitados no se dispersen y manteniendo la energía alta en todo momento.
          </div>
        </div>

        <!-- SERVICE 3 -->
        <div class="service-row-card sr-pink">
          <div class="sr-header">
            <div class="sr-title">03. Mural de Fotos Dinámicas por QR</div>
            <div class="sr-tag">Durante y Post-Evento</div>
          </div>
          <div class="sr-body">
            Identificador con QR exclusivo en cada mesa. Los invitados sacan selfies y dedicatorias que se proyectan en pantalla gigante en segundos con transiciones elegantes.
          </div>
          <div class="feature-grid-mini">
            <div class="f-item"><strong>QR por Mesa:</strong> Escaneo instantáneo sin login.</div>
            <div class="f-item"><strong>Moderación:</strong> Filtro de seguridad opcional.</div>
            <div class="f-item"><strong>Rotación TV:</strong> Visual moderno para proyectores.</div>
            <div class="f-item"><strong>Descarga ZIP:</strong> Álbum digital completo en alta resolución.</div>
          </div>
          <div class="b2b-highlight">
            💡 <strong>Valor para el Organizador:</strong> Justifica la infraestructura audiovisual del salón y regala a los anfitriones recuerdos genuinos que el fotógrafo no llega a ver.
          </div>
        </div>
      </div>

      <div class="footer-bar">
        <div><strong>EVENTOS KRONITT</strong> · Dossier Comercial B2B</div>
        <div>Página 01 de 02 · eventos-suite.vercel.app/organizadores</div>
      </div>
    </div>
  </div>

  <!-- PAGE 2: TECH & 3 COMMERCIAL MODELS -->
  <div class="page">
    <div class="bg-glow glow-pink"></div>
    <div class="bg-glow glow-purple"></div>
    
    <div class="content-layer">
      <div class="header-brand">
        <div class="brand-left">
          <div class="brand-logo">
            <svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/></svg>
          </div>
          <div>
            <div class="brand-name">EVENTOS KRONITT</div>
            <div class="brand-sub">Especificaciones & Comercialización</div>
          </div>
        </div>
        <div class="badge-tag">Página 02 de 02</div>
      </div>

      <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
        <div class="section-headline">
          <h2>Simplicidad Técnica & Modelos de Comercialización</h2>
          <p>Cero fricción operativa para tu salón y beneficios comerciales directos para cada tipo de cliente.</p>
        </div>

        <!-- SPECS TABLE -->
        <div class="specs-table-box">
          <table>
            <thead>
              <tr>
                <th style="width: 28%;">Aspecto Técnico</th>
                <th style="width: 72%;">Garantía y Especificación Kronitt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Instalación</strong></td>
                <td>100% Web moderna. No requiere descargar apps ni instalar programas en computadoras.</td>
              </tr>
              <tr>
                <td><strong>Conectividad</strong></td>
                <td>Optimizado para Wi-Fi estándar o 4G (compresión automática de imágenes en el celular).</td>
              </tr>
              <tr>
                <td><strong>Pantallas del Salón</strong></td>
                <td>Compatible con cualquier Smart TV, pantalla LED modular o proyector con conexión HDMI.</td>
              </tr>
              <tr>
                <td><strong>Soporte Integral</strong></td>
                <td>Kronitt entrega los links de pantalla listos para proyectar y los QRs listos para imprimir.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 3 COMMERCIAL MODELS -->
        <div class="models-grid-dossier">
          <div class="m-card-dossier">
            <div>
              <div class="m-badge-dossier">1. Para Organizadores</div>
              <div class="m-title-dossier">Ganancia Escalada Mensual</div>
              <div class="m-desc-dossier">
                Comisión creciente según los servicios vendidos al mes. A mayor volumen de eventos cerrados, mayor es tu margen por fecha.
              </div>
            </div>
            <div class="m-callout-dossier">
              📈 Escala: 15% · 20% · 25% + Bonos
            </div>
          </div>

          <div class="m-card-dossier">
            <div>
              <div class="m-badge-dossier">2. Para Salones de Fiesta</div>
              <div class="m-title-dossier">Paquetes Mensuales (Abono)</div>
              <div class="m-desc-dossier">
                Tarifa plana por paquete de fechas o cobertura ilimitada mensual para incluir tecnología en todas tus propuestas "All-Inclusive".
              </div>
            </div>
            <div class="m-callout-dossier">
              🏢 Tarifa mayorista fija por mes
            </div>
          </div>

          <div class="m-card-dossier">
            <div>
              <div class="m-badge-dossier">3. Para Quien Festeja</div>
              <div class="m-title-dossier">Combos de Servicios</div>
              <div class="m-desc-dossier">
                Packs promocionales accesibles para familias y parejas: Pack Invitación, Pack Show (Trivia + Mural) o Full Suite con los 3 módulos.
              </div>
            </div>
            <div class="m-callout-dossier">
              🎉 Ahorro al combinar servicios
            </div>
          </div>
        </div>

        <!-- DEMO CTA (SIN WHATSAPP) -->
        <div class="cta-strip-dossier">
          <h3>Demostración Interactiva en Vivo</h3>
          <p>Podés escanear con tu celular y probar los 3 servicios funcionando en tiempo real en nuestro showroom online.</p>
          <div class="cta-link-pill">
            eventos-suite.vercel.app/organizadores
          </div>
        </div>
      </div>

      <div class="footer-bar">
        <div><strong>EVENTOS KRONITT</strong> · Dossier Comercial B2B</div>
        <div>Página 02 de 02 · Showroom: <strong>eventos-suite.vercel.app/organizadores</strong></div>
      </div>
    </div>
  </div>
</body>
</html>`;

// =========================================================================
// 3. PLAYBOOK DE VENTAS (2 Páginas A4, Texto Grueso y Claro, Sin WSP)
// =========================================================================
const playbookHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Playbook de Ventas B2B - Eventos Kronitt</title>
  <style>
    ${commonCss}
    
    .section-title-bar {
      margin-bottom: 12px;
    }
    
    .section-title-bar h2 {
      font-size: 19px;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 3px;
      letter-spacing: -0.3px;
    }
    
    .section-title-bar p {
      font-size: 11.5px;
      font-weight: 600;
      color: #cbd5e1;
    }
    
    .script-box {
      background: #0d1224;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 12px;
      padding: 12px 15px;
      margin-bottom: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
    }
    
    .script-tag {
      font-size: 10.5px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      color: #93c5fd;
      margin-bottom: 6px;
    }
    
    .script-quote {
      background: rgba(0, 0, 0, 0.4);
      border-left: 3.5px solid #818cf8;
      padding: 10px 14px;
      border-radius: 7px;
      font-size: 10.5px;
      font-weight: 600;
      color: #f1f5f9;
      line-height: 1.5;
      white-space: pre-wrap;
    }
    
    .steps-grid {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .step-card {
      background: #0d1224;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      padding: 9px 14px;
      display: flex;
      gap: 12px;
      align-items: center;
    }
    
    .step-num {
      width: 26px;
      height: 26px;
      background: linear-gradient(135deg, #6366f1, #a855f7);
      color: #ffffff;
      border-radius: 50%;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11.5px;
      flex-shrink: 0;
    }
    
    .step-info strong {
      font-size: 11.5px;
      font-weight: 800;
      color: #ffffff;
      display: block;
      margin-bottom: 2px;
    }
    
    .step-info p {
      font-size: 10.5px;
      font-weight: 600;
      color: #cbd5e1;
      line-height: 1.35;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10.5px;
    }
    
    th {
      background: #141c36;
      padding: 8px 12px;
      text-align: left;
      font-weight: 900;
      font-size: 9.8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #cbd5e1;
      border-bottom: 1.5px solid rgba(255, 255, 255, 0.12);
    }
    
    td {
      padding: 8px 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: #f1f5f9;
      font-weight: 600;
      line-height: 1.4;
    }
    
    tr:last-child td { border-bottom: none; }
  </style>
</head>
<body>
  <!-- PAGE 1 -->
  <div class="page">
    <div class="bg-glow glow-purple"></div>
    
    <div class="content-layer">
      <div class="header-brand">
        <div class="brand-left">
          <div class="brand-logo">
            <svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/></svg>
          </div>
          <div>
            <div class="brand-name">EVENTOS KRONITT</div>
            <div class="brand-sub">Playbook de Ventas B2B</div>
          </div>
        </div>
        <div class="badge-tag">Página 01 · Prospección</div>
      </div>

      <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
        <div class="section-title-bar">
          <h2>Scripts de Prospección Comercial</h2>
          <p>Mensajes directos para contactar salones y planners por WhatsApp o redes sociales.</p>
        </div>

        <div class="script-box">
          <div class="script-tag">1. Contacto para Salones de Fiestas</div>
          <div class="script-quote">"Hola [Nombre], ¿cómo estás? Te escribe [Tu Nombre] de Eventos Kronitt.
Estuve viendo los eventos increíbles que hacen en [Nombre del Salón] y quería consultarte algo rápido:
¿Tienen actualmente algún sistema interactivo para que los invitados jueguen desde sus celulares y proyecten fotos en vivo en sus pantallas durante la cena?

Desarrollamos una plataforma web interactiva llave en mano (Trivia en vivo, Mural de fotos por QR e Invitaciones RSVP) que muchos salones están sumando a sus paquetes premium o recomendando con comisión directa.

Los invitados no descargan ninguna app. Te comparto un enlace demo de 30 segundos para que pruebes cómo funciona desde tu celular: 👉 [Link a eventos-suite.vercel.app/organizadores]

Si te parece, te cuento en 5 minutos cómo podemos implementarlo en un evento de prueba sin costo para el salón. ¿Te gustaría ver cómo funciona?"</div>
        </div>

        <div class="script-box">
          <div class="script-tag">2. Contacto para Wedding Planners</div>
          <div class="script-quote">"¡Hola [Nombre]! Sigo tu trabajo organizando eventos, impecable la dedicación que le ponés a cada detalle.
Te escribo porque creamos Eventos Kronitt, una herramienta diseñada justamente para solucionar dos dolores de cabeza típicos de las planners:
1. El desorden con el catering: Formulario RSVP interactivo con reporte en vivo de confirmados y dietas especiales.
2. Momentos estáticos en la cena: Trivia interactiva en pantalla gigante y mural de fotos rotativo por QR.

Lo mejor: los invitados no descargan nada y vos como planner podés monetizarlo con comisión por evento o integrarlo a tu propuesta de valor para cerrar clientes indecisos.
Te dejo el demo para que lo chusmees en 1 minuto: 👉 [Link a /organizadores]"</div>
        </div>

        <div class="section-title-bar" style="margin-top: 10px; margin-bottom: 8px;">
          <h2 style="font-size: 14.5px;">Estructura de Reunión o Videollamada (15 Minutos)</h2>
        </div>

        <div class="steps-grid">
          <div class="step-card">
            <div class="step-num">1</div>
            <div class="step-info">
              <strong>Diagnóstico & Validación de Dolores (3 min)</strong>
              <p>"¿Cómo manejan hoy el RSVP para catering y los momentos de bache en la cena?"</p>
            </div>
          </div>
          <div class="step-card">
            <div class="step-num">2</div>
            <div class="step-info">
              <strong>Demostración en Vivo en su Celular (5 min)</strong>
              <p>Hacer que escanee los QR de /organizadores y experimente la apertura del sobre, la trivia y el mural.</p>
            </div>
          </div>
          <div class="step-card">
            <div class="step-num">3</div>
            <div class="step-info">
              <strong>Propuesta Comercial & Cierre de Evento Piloto (7 min)</strong>
              <p>Presentar el modelo de comisión escalada mensual o paquete de salón y ofrecer el primer evento bonificado.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bar">
        <div><strong>EVENTOS KRONITT</strong> · Playbook de Ventas B2B</div>
        <div>Página 01 de 02 · Uso Interno Comercial</div>
      </div>
    </div>
  </div>

  <!-- PAGE 2 -->
  <div class="page">
    <div class="bg-glow glow-pink"></div>
    
    <div class="content-layer">
      <div class="header-brand">
        <div class="brand-left">
          <div class="brand-logo">
            <svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/></svg>
          </div>
          <div>
            <div class="brand-name">EVENTOS KRONITT</div>
            <div class="brand-sub">Herramientas de Cierre</div>
          </div>
        </div>
        <div class="badge-tag">Página 02 · Objeciones</div>
      </div>

      <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
        <div class="section-title-bar">
          <h2>Mensajes Listos para Reenviar a Clientes</h2>
          <p>Textos para que el Planner o Salón copie y pegue a sus novios o quinceañeras.</p>
        </div>

        <div class="script-box">
          <div class="script-tag">Para Novios (Casamientos)</div>
          <div class="script-quote">"¡Hola chicos! Pensando en su boda, les quería compartir un servicio interactivo espectacular que estamos trabajando para que la fiesta sea inolvidable:
💌 Invitación Digital de Lujo: Con sobre virtual interactivo, música, mapa GPS y confirmación con dietas para el catering.
🏆 Trivia de la Pareja en Vivo: Un show en pantalla gigante durante la cena donde los invitados juegan con su celular respondiendo anécdotas sobre ustedes.
📸 Mural de Fotos en Pantalla: Cada mesa tiene su QR para sacar selfies y dedicatorias que se proyectan en vivo. Al final, se descargan todas las fotos en alta resolución.

Miren este link para probarlo: [Link Demo]
¿Les gustaría que lo sumemos a la propuesta de su evento?"</div>
        </div>

        <div class="section-title-bar" style="margin-top: 10px; margin-bottom: 8px;">
          <h2 style="font-size: 14.5px;">Matriz de Manejo de Objeciones</h2>
        </div>

        <div style="border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 12px; overflow: hidden; background: #0d1224;">
          <table>
            <thead>
              <tr>
                <th style="width: 32%;">Objeción</th>
                <th style="width: 68%;">Respuesta Profesional Recomendada</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>"La señal de Wi-Fi en el salón es débil."</strong></td>
                <td>El sistema comprime las fotos en el propio teléfono antes de subirlas y las trivias consumen menos de 100 KB. Funciona fluido con cualquier Wi-Fi básico o señal 4G.</td>
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
                <td>Se puede contratar por combos o módulos individuales (solo la Trivia o solo la Invitación) y la invitación ahorra el costo total de imprenta tradicional.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="footer-bar">
        <div><strong>EVENTOS KRONITT</strong> · Playbook de Ventas B2B</div>
        <div>Página 02 de 02 · Showroom: <strong>eventos-suite.vercel.app/organizadores</strong></div>
      </div>
    </div>
  </div>
</body>
</html>`;

// Write HTMLs to temp
const onePagerPath = path.join(tempDir, 'one_pager.html');
const dossierPath = path.join(tempDir, 'dossier.html');
const playbookPath = path.join(tempDir, 'playbook.html');

fs.writeFileSync(onePagerPath, onePagerHtml, 'utf8');
fs.writeFileSync(dossierPath, dossierHtml, 'utf8');
fs.writeFileSync(playbookPath, playbookHtml, 'utf8');

// Target PDF outputs
const outOnePager = path.join(docsDir, 'ONE_PAGER_EVENTOS_KRONITT.pdf');
const outDossier = path.join(docsDir, 'DOSSIER_COMERCIAL_EVENTOS_KRONITT.pdf');
const outPlaybook = path.join(docsDir, 'PLAYBOOK_VENTAS_EVENTOS_KRONITT.pdf');

function renderPdf(htmlPath, outPdf) {
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  const cmd = `"${chromePath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${outPdf}" "${fileUrl}"`;
  console.log(`Rendering ${path.basename(outPdf)}...`);
  execSync(cmd, { stdio: 'inherit' });
}

try {
  renderPdf(onePagerPath, outOnePager);
  renderPdf(dossierPath, outDossier);
  renderPdf(playbookPath, outPlaybook);

  // Copy to public/docs for web access
  fs.copyFileSync(outOnePager, path.join(publicDocsDir, 'ONE_PAGER_EVENTOS_KRONITT.pdf'));
  fs.copyFileSync(outDossier, path.join(publicDocsDir, 'DOSSIER_COMERCIAL_EVENTOS_KRONITT.pdf'));
  fs.copyFileSync(outPlaybook, path.join(publicDocsDir, 'PLAYBOOK_VENTAS_EVENTOS_KRONITT.pdf'));

  console.log('All 3 PDFs regenerated with high-contrast text, 3 commercial models, no WhatsApp, and 2-page Dossier!');
} catch (err) {
  console.error('Error generating PDFs:', err);
  process.exit(1);
}
