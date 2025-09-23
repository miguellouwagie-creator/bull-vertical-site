import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

/** Dirección oficial + link a Maps */
const ADDRESS_TEXT = "515 N.W. 59th Ave., Ste. 519, Miami, FL 33126";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(ADDRESS_TEXT);

/** Teléfonos */
const PHONE_E164 = "+17866130866"; // tel: (USA)
const WA_PHONE_ES = "34603428966"; // WhatsApp ES (sin '+') para wa.me

/** Email de contacto (destinatario) */
const SUPPORT_EMAIL = "bullverticalservice@gmail.com";
const MAILTO_PLAIN = `mailto:${SUPPORT_EMAIL}`;

/** Construye URL de Gmail compose */
function buildGmailCompose(to: string, subject: string, body: string) {
  const base = "https://mail.google.com/mail/?view=cm&fs=1";
  const params = new URLSearchParams({
    to,
    su: subject,
    body,
  });
  return `${base}&${params.toString()}`;
}

export const Contact = () => {
  const { lang } = useLang();
  const dict = (translations as any)[lang]?.contact ?? {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    building: "",
    stories: "",
    scope: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [lastMailUrl, setLastMailUrl] = useState<string>("");

  const handleInputChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const header = (lang || "").startsWith("es")
      ? "Solicitud de presupuesto"
      : "Quote request";

    const lines = [
      `${header}:`,
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Building: ${formData.building}`,
      `Floors/last cleaning: ${formData.stories || "—"}`,
      `Scope: ${formData.scope || "—"}`,
      `Notes: ${formData.notes || "—"}`,
    ];
    const body = lines.join("\n");

    // Principal: abrir Gmail compose (web)
    const gmailUrl = buildGmailCompose(SUPPORT_EMAIL, header, body);

    try {
      setLastMailUrl(gmailUrl);
      window.open(gmailUrl, "_blank", "noopener,noreferrer");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  // Textos con fallback
  const title: string = dict.title ?? "Contact Us";
  const subtitle: string =
    dict.subtitle ??
    "Ready to schedule your window cleaning service? Get in touch with us today.";
  const infoTitle: string = dict.infoTitle ?? "Contact Information";
  const infoDesc: string =
    dict.infoDesc ?? "Contact us for quotes and inquiries";
  const emailLabel: string = SUPPORT_EMAIL; // forzamos correo nuevo
  const phoneLabel: string = dict.phoneLabel ?? "+1 (786) 613-0866";
  const coiNote: string = dict.coiNote ?? "COI, W-9, vendor onboarding ready.";
  const whatsappCta: string = dict.whatsappCta ?? "Chat on WhatsApp";
  const requestTitle: string = dict.requestTitle ?? "Request a Quote";
  const requestDesc: string =
    dict.requestDesc ??
    "Complete the form below and we'll get back to you within 24 hours";
  const labels = {
    name: dict.labels?.name ?? "Full name",
    email: dict.labels?.email ?? "Email address",
    phone: dict.labels?.phone ?? "Phone number",
    building: dict.labels?.building ?? "Building and address",
    stories: dict.labels?.stories ?? "Floors / last cleaning date",
    notes: dict.labels?.notes ?? "Notes / preferred schedule",
  };
  const selectPlaceholder: string =
    dict.select?.placeholder ?? "Select service";
  const selectOptions = {
    exterior: dict.select?.options?.exterior ?? "Exterior",
    interior: dict.select?.options?.interior ?? "Interior",
    post: dict.select?.options?.post ?? "Post-construction",
    hard: dict.select?.options?.hard ?? "Hard water removal",
    pressure: dict.select?.options?.pressure ?? "Pressure washing",
  };
  const submitCta: string = dict.cta ?? "Request Quote";

  // WhatsApp CTA del panel info (ES)
  const waMsgShort =
    dict.whatsappMessage ??
    ((lang || "").startsWith("es")
      ? "Hola BULL, me gustaría un presupuesto para [Edificio] en Miami."
      : "Hello BULL, I would like a quote for [Building] in Miami.");
  const waHrefES = `https://wa.me/${WA_PHONE_ES}?text=${encodeURIComponent(
    waMsgShort,
  )}`;

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  {infoTitle}
                </CardTitle>
                <CardDescription>{infoDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a
                    href={MAILTO_PLAIN}
                    className="text-foreground hover:text-primary transition-colors underline underline-offset-2"
                  >
                    {emailLabel}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <a
                    href={`tel:${PHONE_E164}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {phoneLabel}
                  </a>
                </div>

                {/* Dirección oficial con enlace a Google Maps */}
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary underline underline-offset-2"
                  >
                    {ADDRESS_TEXT}
                  </a>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    {coiNote}
                  </p>

                  {/* ✅ Botón WhatsApp (ES) */}
                  <Button asChild className="w-full">
                    <a
                      href={waHrefES}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {whatsappCta}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>{requestTitle}</CardTitle>
              <CardDescription>{requestDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Estados */}
              {status === "sent" && (
                <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700 text-sm">
                  {(lang || "").startsWith("es") ? (
                    <>
                      Hemos abierto <strong>Gmail</strong> con el mensaje
                      prellenado a <strong>{SUPPORT_EMAIL}</strong>. Si no se
                      abrió,{" "}
                      <a className="underline" href={lastMailUrl}>
                        haz clic aquí
                      </a>
                      . O llámanos al {phoneLabel}.
                    </>
                  ) : (
                    <>
                      We opened <strong>Gmail</strong> with a prefilled message
                      to <strong>{SUPPORT_EMAIL}</strong>. If it didn’t open,{" "}
                      <a className="underline" href={lastMailUrl}>
                        click here
                      </a>
                      . Or call us at {phoneLabel}.
                    </>
                  )}
                </div>
              )}
              {status === "error" && (
                <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-sm">
                  {(lang || "").startsWith("es")
                    ? "Ocurrió un error al abrir Gmail. Escríbenos a bullverticalservice@gmail.com o llámanos."
                    : "There was an error opening Gmail. You can email us at bullverticalservice@gmail.com or call us."}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder={labels.name}
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder={labels.email}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
                <Input
                  type="tel"
                  placeholder={labels.phone}
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
                <Input
                  placeholder={labels.building}
                  value={formData.building}
                  onChange={(e) =>
                    handleInputChange("building", e.target.value)
                  }
                  required
                />
                <Input
                  placeholder={labels.stories}
                  value={formData.stories}
                  onChange={(e) => handleInputChange("stories", e.target.value)}
                />

                <Select
                  onValueChange={(value) => handleInputChange("scope", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={selectPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exterior">
                      {selectOptions.exterior}
                    </SelectItem>
                    <SelectItem value="interior">
                      {selectOptions.interior}
                    </SelectItem>
                    <SelectItem value="post-construction">
                      {selectOptions.post}
                    </SelectItem>
                    <SelectItem value="hard-water-removal">
                      {selectOptions.hard}
                    </SelectItem>
                    <SelectItem value="pressure-washing">
                      {selectOptions.pressure}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Textarea
                  placeholder={labels.notes}
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={4}
                />

                {/* Honeypot anti-spam */}
                <input
                  type="text"
                  name="company_website"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={status === "sending"}
                >
                  {status === "sending"
                    ? (lang || "").startsWith("es")
                      ? "Enviando..."
                      : "Sending..."
                    : submitCta}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
