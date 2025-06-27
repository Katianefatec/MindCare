# Proteção de Direitos Autorais - MindCare

## Medidas de Proteção Implementadas

### 1. Licença Proprietária
- ✅ Arquivo `LICENSE` atualizado com licença proprietária
- ✅ Proibição expressa de uso comercial sem autorização
- ✅ Obrigatoriedade de pagamento de royalties para uso comercial

### 2. Informações no APK
- ✅ Copyright no `app.json` (aparece no APK)
- ✅ Informações de autoria no manifesto
- ✅ Ícone personalizado com logo da marca

### 3. Proteções Adicionais Recomendadas

#### A. Para o APK Final:
1. **Assinatura Digital**:
   ```bash
   # Gerar keystore (uma vez apenas)
   keytool -genkey -v -keystore mindcare-release-key.keystore -alias mindcare-key -keyalg RSA -keysize 2048 -validity 10000
   
   # Configurar no app.json
   "android": {
     "signingCredentials": {
       "keystore": "./mindcare-release-key.keystore",
       "keystorePassword": "SUA_SENHA_AQUI",
       "keyAlias": "mindcare-key",
       "keyPassword": "SUA_SENHA_AQUI"
     }
   }
   ```

2. **Proteção contra Engenharia Reversa**:
   ```bash
   # Instalar ProGuard/R8 para ofuscar código
   npm install --save-dev @react-native-community/cli-platform-android
   ```

3. **Informações Adicionais no Manifesto**:
   - Nome da empresa
   - Informações de contato
   - Versão com marca registrada

#### B. Proteções Legais Adicionais:

1. **Registro de Marca** (Recomendado):
   - Registrar "MindCare" como marca no INPI
   - Protege o nome e logo da aplicação

2. **Registro de Direitos Autorais**:
   - Registrar o software na Biblioteca Nacional
   - Documento oficial de propriedade intelectual

3. **Monitoramento de Violações**:
   - Verificar periodicamente se há cópias não autorizadas
   - Google Play Store e outras lojas de aplicativos

#### C. Medidas Técnicas de Proteção:

1. **Watermark no Código**:
   ```typescript
   // Adicionar em arquivos principais
   const APP_SIGNATURE = 'MindCare-KMS-2025-' + btoa(Date.now().toString());
   ```

2. **Verificação de Integridade**:
   ```typescript
   // Verificar se o app não foi modificado
   const checkIntegrity = () => {
     // Implementar verificação de hash
   };
   ```

3. **Telemetria e Analytics**:
   - Rastrear instalações e uso
   - Detectar distribuições não autorizadas

#### D. Aviso Legal no App:

**Incluir tela "Sobre" ou "Licença" no aplicativo com:**
- Informações de copyright
- Termos de uso
- Contato para licenciamento comercial
- Aviso de proteção legal

## Próximos Passos para Proteção Total:

1. ✅ **Já Implementado**: Licença proprietária e copyright
2. 🔲 **Recomendado**: Assinatura digital do APK
3. 🔲 **Opcional**: Registro de marca e direitos autorais
4. 🔲 **Futuro**: Tela "Sobre" no app com informações legais

## Contato para Licenciamento:

Para solicitar licenciamento comercial do MindCare, entre em contato:
- **Email**: [seu-email@exemplo.com]
- **Assunto**: "Licenciamento Comercial - MindCare"

## Observações Importantes:

- A licença atual PROÍBE uso comercial sem autorização
- Qualquer violação pode resultar em ação legal
- Para uso comercial, é obrigatório o pagamento de royalties
- O código está disponível apenas para fins educacionais e de estudo

---

**© 2025 Katiane Margiotti Soares. Todos os direitos reservados.**
