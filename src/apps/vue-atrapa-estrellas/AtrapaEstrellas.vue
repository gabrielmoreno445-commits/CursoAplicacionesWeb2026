<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'

const estado = ref('inicio')
const puntos = ref(0)
const tiempo = ref(30)
const combo = ref(0)
const record = ref(Number(localStorage.getItem('vue-atrapa-estrellas-record') || 0))
const objetivo = ref({ x: 50, y: 50, tipo: 'estrella' })
const mensaje = ref('Toca las estrellas y evita los meteoritos.')

let reloj = null
let cambioObjetivo = null

const progreso = computed(() => `${(tiempo.value / 30) * 100}%`)
const esJugando = computed(() => estado.value === 'jugando')

function posicionAleatoria() {
  return {
    x: Math.floor(Math.random() * 78) + 8,
    y: Math.floor(Math.random() * 66) + 12,
  }
}

function nuevoObjetivo() {
  const esMeteorito = Math.random() < 0.24
  objetivo.value = {
    ...posicionAleatoria(),
    tipo: esMeteorito ? 'meteorito' : 'estrella',
  }
}

function limpiarTimers() {
  clearInterval(reloj)
  clearInterval(cambioObjetivo)
  reloj = null
  cambioObjetivo = null
}

function iniciarJuego() {
  limpiarTimers()
  estado.value = 'jugando'
  puntos.value = 0
  tiempo.value = 30
  combo.value = 0
  mensaje.value = 'Busca la estrella activa.'
  nuevoObjetivo()

  reloj = setInterval(() => {
    tiempo.value -= 1
    if (tiempo.value <= 0) {
      finalizarJuego()
    }
  }, 1000)

  cambioObjetivo = setInterval(nuevoObjetivo, 1150)
}

function finalizarJuego() {
  estado.value = 'fin'
  limpiarTimers()

  if (puntos.value > record.value) {
    record.value = puntos.value
    localStorage.setItem('vue-atrapa-estrellas-record', String(record.value))
    mensaje.value = 'Nuevo record guardado.'
    return
  }

  mensaje.value = 'Partida terminada.'
}

function tocarObjetivo() {
  if (!esJugando.value) return

  if (objetivo.value.tipo === 'meteorito') {
    puntos.value = Math.max(0, puntos.value - 3)
    combo.value = 0
    tiempo.value = Math.max(1, tiempo.value - 2)
    mensaje.value = 'Meteorito: pierdes puntos y tiempo.'
  } else {
    combo.value += 1
    puntos.value += 1 + Math.floor(combo.value / 4)
    mensaje.value = combo.value >= 4 ? `Combo x${combo.value}` : 'Estrella atrapada.'
  }

  nuevoObjetivo()
}

onBeforeUnmount(limpiarTimers)
</script>

<template>
  <section class="vue-game" aria-labelledby="titulo-juego-vue">
    <header class="vue-game__header">
      <div>
        <span class="vue-game__eyebrow">Mini app Vue en Astro</span>
        <h1 id="titulo-juego-vue">Atrapa Estrellas</h1>
      </div>
      <a class="vue-game__back" href="/apps">Volver a apps</a>
    </header>

    <div class="vue-game__hud" aria-live="polite">
      <div>
        <span>Puntos</span>
        <strong>{{ puntos }}</strong>
      </div>
      <div>
        <span>Tiempo</span>
        <strong>{{ tiempo }}s</strong>
      </div>
      <div>
        <span>Record</span>
        <strong>{{ record }}</strong>
      </div>
    </div>

    <div class="vue-game__timer" aria-hidden="true">
      <span :style="{ width: progreso }"></span>
    </div>

    <div class="vue-game__arena">
      <div v-if="estado !== 'jugando'" class="vue-game__overlay">
        <h2>{{ estado === 'inicio' ? 'Preparate para jugar' : 'Resultado final' }}</h2>
        <p>{{ estado === 'inicio' ? 'Tenes 30 segundos para sumar puntos.' : `Terminaste con ${puntos} puntos.` }}</p>
        <button type="button" @click="iniciarJuego">
          {{ estado === 'inicio' ? 'Iniciar' : 'Jugar de nuevo' }}
        </button>
      </div>

      <button
        v-if="estado === 'jugando'"
        type="button"
        class="vue-game__target"
        :class="`vue-game__target--${objetivo.tipo}`"
        :style="{ left: `${objetivo.x}%`, top: `${objetivo.y}%` }"
        :aria-label="objetivo.tipo === 'estrella' ? 'Atrapar estrella' : 'Evitar meteorito'"
        @click="tocarObjetivo"
      >
        {{ objetivo.tipo === 'estrella' ? '★' : '!' }}
      </button>
    </div>

    <p class="vue-game__message" role="status">{{ mensaje }}</p>
  </section>
</template>

<style scoped>
.vue-game {
  min-height: 100vh;
  padding: 32px;
  color: #17202a;
  background:
    radial-gradient(circle at 12% 18%, rgba(255, 214, 102, 0.28), transparent 28%),
    linear-gradient(135deg, #eef7ff 0%, #f7fbf2 48%, #fff4e0 100%);
}

.vue-game__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  max-width: 960px;
  margin: 0 auto 20px;
}

.vue-game__eyebrow {
  display: block;
  margin-bottom: 6px;
  color: #2f6f73;
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
}

.vue-game h1 {
  margin: 0;
  font-size: clamp(2rem, 6vw, 4rem);
  letter-spacing: 0;
}

.vue-game__back,
.vue-game button {
  border: 0;
  border-radius: 8px;
  font: inherit;
  font-weight: 800;
}

.vue-game__back {
  flex: 0 0 auto;
  padding: 12px 16px;
  color: #ffffff;
  text-decoration: none;
  background: #17202a;
}

.vue-game__hud {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  max-width: 960px;
  margin: 0 auto;
}

.vue-game__hud div {
  padding: 14px;
  border: 2px solid #d7e5df;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.78);
}

.vue-game__hud span {
  display: block;
  color: #53616c;
  font-size: 0.82rem;
  font-weight: 700;
}

.vue-game__hud strong {
  display: block;
  margin-top: 4px;
  font-size: 1.7rem;
}

.vue-game__timer {
  max-width: 960px;
  height: 12px;
  margin: 12px auto 18px;
  overflow: hidden;
  border-radius: 999px;
  background: #d9e2e7;
}

.vue-game__timer span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #2f9e8f, #f2b84b, #e65f4f);
  transition: width 180ms linear;
}

.vue-game__arena {
  position: relative;
  max-width: 960px;
  height: min(58vh, 520px);
  min-height: 360px;
  margin: 0 auto;
  overflow: hidden;
  border: 3px solid #17202a;
  border-radius: 8px;
  background:
    linear-gradient(rgba(23, 32, 42, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(23, 32, 42, 0.04) 1px, transparent 1px),
    #ffffff;
  background-size: 34px 34px;
  box-shadow: 0 18px 45px rgba(23, 32, 42, 0.16);
}

.vue-game__overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  gap: 12px;
  padding: 24px;
  text-align: center;
  background: rgba(255, 255, 255, 0.86);
}

.vue-game__overlay h2 {
  margin: 0;
  font-size: clamp(1.8rem, 5vw, 3rem);
}

.vue-game__overlay p {
  margin: 0;
  color: #53616c;
  font-size: 1.05rem;
}

.vue-game__overlay button {
  justify-self: center;
  padding: 13px 22px;
  color: #17202a;
  background: #ffd666;
  cursor: pointer;
}

.vue-game__target {
  position: absolute;
  width: 74px;
  height: 74px;
  display: grid;
  place-items: center;
  transform: translate(-50%, -50%);
  color: #17202a;
  font-size: 2.8rem;
  line-height: 1;
  cursor: pointer;
  transition: left 140ms ease, top 140ms ease, transform 120ms ease;
}

.vue-game__target:hover {
  transform: translate(-50%, -50%) scale(1.08);
}

.vue-game__target--estrella {
  background: #ffd666;
  box-shadow: 0 12px 24px rgba(242, 184, 75, 0.38);
}

.vue-game__target--meteorito {
  color: #ffffff;
  background: #e65f4f;
  box-shadow: 0 12px 24px rgba(230, 95, 79, 0.34);
}

.vue-game__message {
  max-width: 960px;
  margin: 16px auto 0;
  color: #2f3c46;
  font-weight: 800;
  text-align: center;
}

@media (max-width: 680px) {
  .vue-game {
    padding: 18px;
  }

  .vue-game__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .vue-game__hud {
    grid-template-columns: 1fr;
  }

  .vue-game__arena {
    min-height: 420px;
  }
}
</style>
