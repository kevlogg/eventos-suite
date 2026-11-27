const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const docsDir = path.join(__dirname, 'docs');
const publicDocsDir = path.join(__dirname, 'public', 'docs');
const tempDir = path.join(docsDir, 'temp_pdf_src');

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
if (!fs.existsSync(publicDocsDir)) fs.mkdirSync(publicDocsDir, { recursive: true });

// Common CSS: High-contrast, bold, clear typography, full-bleed A4, clickable links
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
    padding: 13mm 16mm 11mm 16mm;
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
    padding-bottom: 10px;
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
    padding-top: 8px;
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
  .footer-bar a {
    color: #a5b4fc;
    text-decoration: underline;
    font-weight: 800;
  }
`;

// =========================================================================
// 1. ONE-PAGER EJECUTIVO (Servicio base $60.000, Combos y Escala B2B)
// =========================================================================
const onePagerHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>One-Pager Ejecutivo - Eventos Kronitt</title>
  <style>
    ${commonCss}
    
    .hero-section {
      margin-top: 6px;
      margin-bottom: 10px;
    }
    
    .hero-title {
      font-size: 20px;
      font-weight: 900;
      line-height: 1.2;
      color: #ffffff;
      margin-bottom: 4px;
      letter-spacing: -0.4px;
    }
    
    .hero-title span {
      background: linear-gradient(90deg, #93c5fd 0%, #c084fc 50%, #f472b6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .hero-desc {
      font-size: 11px;
      color: #e2e8f0;
      font-weight: 600;
      line-height: 1.4;
    }
    
    /* 3 Services Grid */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 11px;
    }
    
    .service-card {
      background: #0d1224;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 12px;
      padding: 12px;
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
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 3px;
    }
    .badge-amber { color: #fcd34d; }
    .badge-purple { color: #d8b4fe; }
    .badge-pink { color: #f9a8d4; }
    
    .svc-name {
      font-size: 13px;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 2px;
      line-height: 1.2;
    }

    .svc-price-tag {
      font-size: 10px;
      font-weight: 800;
      color: #38bdf8;
      margin-bottom: 5px;
    }
    
    .svc-items {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .svc-items li {
      font-size: 9.8px;
      font-weight: 600;
      color: #f1f5f9;
      line-height: 1.3;
      display: flex;
      align-items: flex-start;
      gap: 6px;
    }
    
    .svc-items li svg {
      width: 12px;
      height: 12px;
      flex-shrink: 0;
      margin-top: 1px;
      stroke-width: 2.8;
    }
    .icon-amber { stroke: #fbbf24; }
    .icon-purple { stroke: #c084fc; }
    .icon-pink { stroke: #f472b6; }
    
    .block-header {
      font-size: 11px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #ffffff;
      margin-bottom: 6px;
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
    
    /* Combos B2C Grid */
    .combos-b2c-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 11px;
    }

    .combo-box {
      background: #0d1224;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 11px;
      padding: 10px 12px;
    }
    .combo-box.featured {
      border: 1.5px solid #a855f7;
      background: linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, #0d1224 100%);
    }

    .combo-tag {
      font-size: 8.5px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #93c5fd;
      margin-bottom: 2px;
    }
    .combo-price {
      font-size: 15px;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 3px;
    }
    .combo-desc {
      font-size: 9.5px;
      font-weight: 600;
      color: #cbd5e1;
      line-height: 1.35;
    }
    .combo-saving {
      font-size: 9px;
      font-weight: 800;
      color: #4ade80;
      margin-top: 4px;
    }

    /* B2B Partner Table */
    .table-box {
      border: 1px solid rgba(99, 102, 241, 0.35);
      border-radius: 11px;
      overflow: hidden;
      margin-bottom: 11px;
      background: #0d1224;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10px;
    }
    
    th {
      background: #141c36;
      padding: 7px 12px;
      text-align: left;
      font-weight: 900;
      font-size: 9.5px;
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
      color: #4ade80;
      font-weight: 800;
    }

    /* Bottom Strip */
    .demo-strip {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.22) 0%, rgba(168, 85, 247, 0.22) 100%);
      border: 1.5px solid rgba(99, 102, 241, 0.45);
      border-radius: 12px;
      padding: 9px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .demo-left h4 {
      font-size: 11.5px;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 1px;
    }
    
    .demo-left p {
      font-size: 10px;
      font-weight: 600;
      color: #e2e8f0;
    }
    
    .demo-url-btn {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: #ffffff !important;
      font-size: 11px;
      font-weight: 800;
      padding: 7px 16px;
      border-radius: 9px;
      letter-spacing: 0.3px;
      text-decoration: none !important;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.2);
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
          Suite web en tiempo real que digitaliza cada fiesta: <strong>Antes</strong> (Invitación & RSVP de catering), <strong>Durante</strong> (Trivia en pantallas LED y fotos en vivo por QR) y <strong>Después</strong> (Descarga masiva en alta resolución).
        </p>
      </div>

      <!-- 3 SERVICES ($60.000 BASE EACH) -->
      <div class="services-grid">
        <div class="service-card card-amber">
          <div>
            <span class="svc-badge badge-amber">Servicio 01 · Pre-Evento</span>
            <div class="svc-name">Invitaciones & RSVP</div>
            <div class="svc-price-tag">PVP Individual: $60.000 ARS</div>
          </div>
          <ul class="svc-items">
            <li>
              <svg class="icon-amber" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Sobre virtual 3D con música y animación.</span>
            </li>
            <li>
              <svg class="icon-amber" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Filtro de dietas (celíacos/veganos) para catering.</span>
            </li>
            <li>
              <svg class="icon-amber" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Geolocalización GPS y cofre de regalos con CBU.</span>
            </li>
          </ul>
        </div>

        <div class="service-card card-purple">
          <div>
            <span class="svc-badge badge-purple">Servicio 02 · Durante</span>
            <div class="svc-name">Trivia Fiesta en Vivo</div>
            <div class="svc-price-tag">PVP Individual: $60.000 ARS</div>
          </div>
          <ul class="svc-items">
            <li>
              <svg class="icon-purple" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Show interactivo durante la cena en pantalla LED.</span>
            </li>
            <li>
              <svg class="icon-purple" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Preguntas personalizadas y podio con confeti.</span>
            </li>
            <li>
              <svg class="icon-purple" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Juegan desde el celular sin descargar apps.</span>
            </li>
          </ul>
        </div>

        <div class="service-card card-pink">
          <div>
            <span class="svc-badge badge-pink">Servicio 03 · Durante & Post</span>
            <div class="svc-name">Mural de Fotos por QR</div>
            <div class="svc-price-tag">PVP Individual: $60.000 ARS</div>
          </div>
          <ul class="svc-items">
            <li>
              <svg class="icon-pink" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span>QR en cada mesa: fotos y dedicatorias en vivo.</span>
            </li>
            <li>
              <svg class="icon-pink" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Panel de moderación con filtro de seguridad.</span>
            </li>
            <li>
              <svg class="icon-pink" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Descarga de álbum digital completo en ZIP.</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- PACKS / COMBOS CONSUMIDOR FINAL -->
      <div>
        <div class="block-header">
          <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
          <span>Packs & Combos para el Cliente Final (Valor de lista $180k)</span>
        </div>
        <div class="combos-b2c-grid">
          <div class="combo-box">
            <div class="combo-tag">1 Servicio Suelto</div>
            <div class="combo-price">$60.000</div>
            <div class="combo-desc">A elección: solo Invitación, solo Trivia o solo Mural de fotos.</div>
          </div>

          <div class="combo-box">
            <div class="combo-tag">Combo Dúo (2 Servicios)</div>
            <div class="combo-price">$85.000</div>
            <div class="combo-desc">Elegís 2 módulos (ej: Invitación + Mural o Trivia + Mural).</div>
            <div class="combo-saving">Ahorra $35.000 vs. precio de lista</div>
          </div>

          <div class="combo-box featured">
            <div class="combo-tag" style="color: #d8b4fe;">Combo Full Suite (3 Servicios)</div>
            <div class="combo-price" style="color: #fbcfe8;">$100.000</div>
            <div class="combo-desc">La experiencia completa: Invitación 3D + Trivia LED + Mural QR.</div>
            <div class="combo-saving" style="color: #86efac;">Ahorra $80.000 (¡Pack estrella!)</div>
          </div>
        </div>
      </div>

      <!-- CANAL PARTNERS B2B TABLE (ESCALA POR VOLUMEN MENSUAL) -->
      <div>
        <div class="block-header">
          <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span>Canal Partners B2B: Salones & Organizadores (Tarifa Mayorista Escalonada)</span>
        </div>
        <div class="table-box">
          <table>
            <thead>
              <tr>
                <th style="width: 25%;">Tramo Mensual</th>
                <th style="width: 25%;">Servicios en el Mes</th>
                <th style="width: 25%;">Tu Costo Mayorista</th>
                <th style="width: 25%;">Evento Completo (3 serv.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Tramo 1 (Base)</strong></td>
                <td>1 a 4 servicios</td>
                <td><strong>$25.000</strong> c/u</td>
                <td>$75.000 <span class="td-highlight">(Margen $25k-$35k)</span></td>
              </tr>
              <tr>
                <td><strong>Tramo 2 (Activo)</strong></td>
                <td>5 a 9 servicios</td>
                <td><strong>$20.000</strong> c/u</td>
                <td>$60.000 <span class="td-highlight">(Margen $40k)</span></td>
              </tr>
              <tr>
                <td><strong>Tramo 3 (VIP / Salón)</strong></td>
                <td>10 o más servicios</td>
                <td><strong>$15.000</strong> c/u</td>
                <td>$45.000 <span class="td-highlight">(Margen $55k limpios)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- BOTTOM DEMO STRIP WITH CLICKABLE LINK -->
      <div class="demo-strip">
        <div class="demo-left">
          <h4>¿Querés probar la experiencia en vivo desde tu smartphone?</h4>
          <p>Hacé clic para abrir el showroom interactivo y probar los 3 servicios con códigos QR.</p>
        </div>
        <a href="https://kronitt.com.ar/organizadores" target="_blank" class="demo-url-btn">
          <span>Abrir Demo en Vivo ↗</span>
        </a>
      </div>

      <!-- FOOTER -->
      <div class="footer-bar">
        <div><strong>EVENTOS KRONITT</strong> · Suite de Experiencias Digitales para Eventos</div>
        <div>Showroom Interactivo: <a href="https://kronitt.com.ar/organizadores" target="_blank">kronitt.com.ar/organizadores</a></div>
      </div>
    </div>
  </div>
</body>
</html>`;

// =========================================================================
// 2. DOSSIER B2B COMPLETO (2 Páginas A4, Servicio Base $60.000, Combos y B2B)
// =========================================================================
const dossierHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Dossier Comercial B2B - Eventos Kronitt</title>
  <style>
    ${commonCss}
    
    .section-headline {
      margin-bottom: 12px;
    }
    
    .section-headline h2 {
      font-size: 21px;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 3px;
      letter-spacing: -0.4px;
    }
    
    .section-headline p {
      font-size: 11px;
      font-weight: 600;
      color: #cbd5e1;
    }
    
    .service-row-card {
      background: #0d1224;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 13px;
      padding: 14px 18px;
      margin-bottom: 12px;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
    }
    
    .sr-amber { border-left: 5px solid #f59e0b; }
    .sr-purple { border-left: 5px solid #a855f7; }
    .sr-pink { border-left: 5px solid #ec4899; }
    
    .sr-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
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
      padding: 3px 9px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.08);
      color: #38bdf8;
    }
    
    .sr-body {
      font-size: 11px;
      font-weight: 600;
      color: #e2e8f0;
      line-height: 1.4;
      margin-bottom: 8px;
    }
    
    .feature-grid-mini {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px;
      background: rgba(0, 0, 0, 0.35);
      padding: 8px 12px;
      border-radius: 8px;
      margin-bottom: 8px;
    }
    
    .f-item {
      font-size: 10px;
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
      padding: 7px 12px;
      border-radius: 8px;
      font-size: 10.5px;
      font-weight: 700;
      color: #e0e7ff;
      line-height: 1.35;
    }
    
    /* Page 2 Specs & 3 Models */
    .specs-table-box {
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 14px;
      background: #0d1224;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10.5px;
    }
    
    th {
      background: #141c36;
      padding: 8px 14px;
      text-align: left;
      font-weight: 900;
      font-size: 9.5px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #cbd5e1;
      border-bottom: 1.5px solid rgba(255, 255, 255, 0.12);
    }
    
    td {
      padding: 8px 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: #f1f5f9;
      font-weight: 600;
      line-height: 1.35;
    }
    
    tr:last-child td { border-bottom: none; }
    
    .b2b-boxes-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 14px;
    }

    .b2b-summary-card {
      background: #0d1224;
      border: 1px solid rgba(99, 102, 241, 0.35);
      border-radius: 12px;
      padding: 12px 14px;
    }

    .b2b-summary-card h4 {
      font-size: 12px;
      font-weight: 900;
      color: #93c5fd;
      margin-bottom: 4px;
    }

    .b2b-summary-card p {
      font-size: 10px;
      font-weight: 600;
      color: #cbd5e1;
      line-height: 1.4;
    }

    .cta-strip-dossier {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.22) 0%, rgba(236, 72, 153, 0.22) 100%);
      border: 1.5px solid rgba(99, 102, 241, 0.45);
      border-radius: 13px;
      padding: 14px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    
    .cta-strip-dossier h3 {
      font-size: 14px;
      font-weight: 900;
      color: #ffffff;
    }
    
    .cta-strip-dossier p {
      font-size: 11px;
      font-weight: 600;
      color: #e2e8f0;
      max-width: 580px;
    }
    
    .cta-link-pill {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: #ffffff !important;
      font-size: 11.5px;
      font-weight: 800;
      padding: 8px 20px;
      border-radius: 9px;
      margin-top: 3px;
      letter-spacing: 0.3px;
      text-decoration: none !important;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      box-shadow: 0 4px 16px rgba(79, 70, 229, 0.4);
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.2);
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
          <p>Cada servicio tiene un valor individual de lista de $60.000 ARS. Diseñados para elevar la fiesta y simplificar la gestión.</p>
        </div>

        <!-- SERVICE 1 -->
        <div class="service-row-card sr-amber">
          <div class="sr-header">
            <div class="sr-title">01. Invitaciones Digitales Interactivas & RSVP</div>
            <div class="sr-tag">PVP: $60.000 ARS</div>
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
            <div class="sr-tag">PVP: $60.000 ARS</div>
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
            <div class="sr-tag">PVP: $60.000 ARS</div>
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
        <div>Página 01 de 02 · Showroom: <a href="https://kronitt.com.ar/organizadores" target="_blank">kronitt.com.ar/organizadores</a></div>
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
            <div class="brand-sub">Comercialización & Especificaciones</div>
          </div>
        </div>
        <div class="badge-tag">Página 02 de 02</div>
      </div>

      <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
        <div class="section-headline">
          <h2>Modelos de Comercialización & Alianza B2B</h2>
          <p>Un solo criterio unificado para Salones y Planners con tarifa mayorista decreciente por cantidad de servicios al mes.</p>
        </div>

        <!-- B2B SCALE TABLE -->
        <div class="specs-table-box">
          <table>
            <thead>
              <tr>
                <th style="width: 25%;">Tramo Mensual</th>
                <th style="width: 25%;">Servicios Acumulados</th>
                <th style="width: 25%;">Costo por Servicio</th>
                <th style="width: 25%;">Costo Evento Full (3 serv.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Tramo 1 (Base)</strong></td>
                <td>1 a 4 servicios/mes</td>
                <td><strong>$25.000</strong> c/u</td>
                <td>$75.000 <span style="color:#4ade80;font-weight:800;">(Margen: $25k-$35k)</span></td>
              </tr>
              <tr>
                <td><strong>Tramo 2 (Activo)</strong></td>
                <td>5 a 9 servicios/mes</td>
                <td><strong>$20.000</strong> c/u</td>
                <td>$60.000 <span style="color:#4ade80;font-weight:800;">(Margen: $40k)</span></td>
              </tr>
              <tr>
                <td><strong>Tramo 3 (VIP / Salón)</strong></td>
                <td>10 o más servicios/mes</td>
                <td><strong>$15.000</strong> c/u</td>
                <td>$45.000 <span style="color:#4ade80;font-weight:800;">(Margen: $55k limpios)</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 2 EXPLANATION CARDS -->
        <div class="b2b-boxes-container">
          <div class="b2b-summary-card">
            <h4>Packs Sugeridos al Cliente Final</h4>
            <p>
              • <strong>1 Servicio Individual:</strong> $60.000 ARS.<br>
              • <strong>Combo Dúo (2 servicios):</strong> $85.000 ARS.<br>
              • <strong>Combo Full Suite (3 servicios):</strong> $100.000 ARS.<br>
              El partner es libre de fijar su precio de venta o sumarlo a sus paquetes.
            </p>
          </div>
          <div class="b2b-summary-card">
            <h4>Ventaja Operativa para el Partner</h4>
            <p>
              • <strong>Un solo criterio:</strong> Cada módulo vale exactamente lo mismo.<br>
              • <strong>Mayor volumen = menor costo:</strong> A partir de 10 servicios al mes el costo unitario baja a $15.000.<br>
              • <strong>Cero complejidad técnica:</strong> Kronitt entrega todo configurado y listo para proyectar.
            </p>
          </div>
        </div>

        <!-- DEMO CTA (CLICKABLE BUTTON) -->
        <div class="cta-strip-dossier">
          <h3>Demostración Interactiva en Vivo</h3>
          <p>Podés escanear con tu celular y probar los 3 servicios funcionando en tiempo real en nuestro showroom online.</p>
          <a href="https://kronitt.com.ar/organizadores" target="_blank" class="cta-link-pill">
            <span>Hacer Clic para Abrir Demo en Vivo ↗</span>
          </a>
        </div>
      </div>

      <div class="footer-bar">
        <div><strong>EVENTOS KRONITT</strong> · Dossier Comercial B2B</div>
        <div>Showroom Interactivo: <a href="https://kronitt.com.ar/organizadores" target="_blank">kronitt.com.ar/organizadores</a></div>
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

  // Copy to public/docs for web access
  fs.copyFileSync(outOnePager, path.join(publicDocsDir, 'ONE_PAGER_EVENTOS_KRONITT.pdf'));
  fs.copyFileSync(outDossier, path.join(publicDocsDir, 'DOSSIER_COMERCIAL_EVENTOS_KRONITT.pdf'));

  console.log('PDFs regenerated with $60.000 base service price, Combos and B2B Scale!');
} catch (err) {
  console.error('Error generating PDFs:', err);
  process.exit(1);
}
