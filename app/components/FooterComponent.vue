<template>
  <ModalComponent ref="modal">
    <template #content>
      <p class="h6">{{ modalInfo.name }}</p>
      <p class="body mt-2">
        {{ modalInfo.message }}
      </p>
    </template>
  </ModalComponent>
  <div class="bg-neutral">
    <div
      class="bg-neutral text-neutral-content mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-4 py-10 lg:items-stretch"
    >
      <div class="mb-4 flex justify-between">
        <NuxtLink to="/">
          <NuxtImg
            src="/logo-white.png"
            alt="AutoVolt Logo"
            class="w-56 object-contain"
          />
        </NuxtLink>
        <div class="hidden flex-wrap justify-end gap-2 lg:flex">
          <NuxtLink to="/autos-electricos/" class="btn btn-ghost btn-sm">
            Autos
          </NuxtLink>
          <NuxtLink to="/carga" class="btn btn-ghost btn-sm">
            Carga Residencial
          </NuxtLink>
          <NuxtLink to="/guia" class="btn btn-ghost btn-sm">
            Guía AutoVolt
          </NuxtLink>
          <NuxtLink to="/comparador" class="btn btn-ghost btn-sm">
            Comparador
          </NuxtLink>
          <NuxtLink to="/simulador-ahorros" class="btn btn-ghost btn-sm">
            Simulador de Ahorros
          </NuxtLink>
          <NuxtLink to="/tendencias" class="btn btn-ghost btn-sm">
            Tendencias
          </NuxtLink>
          <NuxtLink to="/contacto" class="btn btn-ghost btn-sm">
            Contacto
          </NuxtLink>
        </div>
      </div>
      <div class="flex flex-col items-center gap-0 lg:items-start">
        <p class="h5">Dirección:</p>
        <p class="body text-center text-lg">
          Apoquindo 2930, Piso 2, Las Condes, Santiago, Chile
        </p>
      </div>
      <div class="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <div class="flex flex-col items-center gap-0 lg:items-start">
          <p class="h5">Contacto:</p>
          <a
            href="mailto:contacto@auto-volt.cl"
            class="body link link-hover link-primary text-lg"
          >
            contacto@auto-volt.cl
          </a>
        </div>
        <div class="flex gap-4">
          <a class="btn btn-outline btn-square">
            <icon name="ph:linkedin-logo-duotone" size="24" />
          </a>
          <a class="btn btn-outline btn-square">
            <icon name="ph:instagram-logo-duotone" size="24" />
          </a>
          <a class="btn btn-outline btn-square">
            <icon name="ph:x-logo-duotone" size="24" />
          </a>
          <a class="btn btn-outline btn-square">
            <icon name="ph:youtube-logo-duotone" size="24" />
          </a>
        </div>
      </div>
      <div class="divider divider-white w-full"></div>
      <div class="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <div
          class="flex flex-col items-center gap-0 text-center *:text-neutral-400 lg:items-start"
        >
          <p class="body">
            © 2025 AutoVolt Chile SPA. Todos los derechos reservados.
          </p>
          <p class="body">
            AutoVolt no está afiliado con ningún fabricante o comercializador de
            autos.
          </p>
          <p class="body">
            Las marcas, nombres de modelos y logotipos son marcas registradas.
          </p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-ghost btn-sm" @click="openPrivacy">
            Política de Privacidad
          </button>
          <button class="btn btn-ghost btn-sm" @click="openCookies">
            Cookies
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const modal = ref<{ modal: HTMLDialogElement | null } | null>(null);
const modalInfo = reactive({
  name: "",
  message: "",
});

const openPrivacy = () => {
  ((modalInfo.name = "Política de Privacidad"),
    (modalInfo.message =
      "En AutoVolt nos tomamos muy en serio la protección de tus datos personales. La información que compartas en nuestro marketplace será utilizada únicamente para brindarte una mejor experiencia, conectarte con proveedores y facilitar la compra o venta de vehículos eléctricos y servicios relacionados. Nunca venderemos tu información a terceros. Solo compartiremos datos cuando sea necesario para concretar operaciones en la plataforma o cumplir con obligaciones legales. Al continuar navegando aceptas nuestra política de privacidad completa."));
  modal.value?.modal?.showModal();
};

const openCookies = () => {
  ((modalInfo.name = "Política de Cookies"),
    (modalInfo.message =
      "En AutoVolt utilizamos cookies para mejorar tu experiencia en el marketplace, personalizar el contenido y analizar el uso de la plataforma. Estas cookies nos ayudan a ofrecerte información más relevante y optimizar el funcionamiento del sitio. Puedes administrar o desactivar las cookies desde la configuración de tu navegador, pero ten en cuenta que algunas funciones del sitio podrían verse limitadas. Al continuar navegando aceptas nuestro uso de cookies."));
  modal.value?.modal?.showModal();
};
</script>
