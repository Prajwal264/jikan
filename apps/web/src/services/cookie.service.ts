class CookieService {
  constructor() {}

  private static getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi, '\\$1');

    return new RegExp(`(?:^${escapedName}|;\\s*${escapedName})=(.*?)(?:;|$)`, 'g');
  }

  private static safeDecodeURIComponent(encodedURIComponent: string): string {
    try {
      return decodeURIComponent(encodedURIComponent);
    } catch {
      return encodedURIComponent;
    }
  }

  check(name: string): boolean {
    const cookieName = encodeURIComponent(name);
    const regExp: RegExp = CookieService.getCookieRegExp(cookieName);
    return regExp.test(document.cookie);
  }

  get(name: string): string {
    if (this.check(name)) {
      const cookieName = encodeURIComponent(name);

      const regExp: RegExp = CookieService.getCookieRegExp(cookieName);
      const result: RegExpExecArray | null = regExp.exec(document.cookie);
      if (result?.length) {
        return result[1] ? CookieService.safeDecodeURIComponent(result[1]) : '';
      }
    }
    return '';
  }

  getAll(): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};

    if (document.cookie && document.cookie !== '') {
      document.cookie.split(';').forEach((currentCookie) => {
        const [cookieName, cookieValue] = currentCookie.split('=');
        cookies[CookieService.safeDecodeURIComponent(cookieName.replace(/^ /, ''))] =
          CookieService.safeDecodeURIComponent(cookieValue);
      });
    }

    return cookies;
  }

  set(
    name: string,
    value: string,
    expiresOrOptions?: number | Date | any,
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite?: 'Lax' | 'None' | 'Strict',
  ): void {
    if (
      typeof expiresOrOptions === 'number' ||
      expiresOrOptions instanceof Date ||
      path ||
      domain ||
      secure ||
      sameSite
    ) {
      const optionsBody = {
        expires: expiresOrOptions,
        path,
        domain,
        secure,
        sameSite: sameSite || 'Lax',
      };

      this.set(name, value, optionsBody);
      return;
    }

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)};`;

    const options = expiresOrOptions || {};

    if (options.expires) {
      if (typeof options.expires === 'number') {
        const dateExpires: Date = new Date(new Date().getTime() + options.expires * 1000 * 60 * 60 * 24);

        cookieString += `expires=${dateExpires.toUTCString()};`;
      } else {
        cookieString += `expires=${options.expires.toUTCString()};`;
      }
    }

    if (options.path) {
      cookieString += `path=${options.path};`;
    }

    if (options.domain) {
      cookieString += `domain=${options.domain};`;
    }

    if (options.secure === false && options.sameSite === 'None') {
      options.secure = true;
    }
    if (options.secure) {
      cookieString += 'secure;';
    }

    if (!options.sameSite) {
      options.sameSite = 'Lax';
    }

    cookieString += `sameSite=${options.sameSite};`;

    document.cookie = cookieString;
  }

  delete(
    name: string,
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite: 'Lax' | 'None' | 'Strict' = 'Lax',
  ): void {
    const expiresDate = new Date('Thu, 01 Jan 1970 00:00:01 GMT');
    this.set(name, '', {
      expires: expiresDate,
      path,
      domain,
      secure,
      sameSite,
    });
  }

  deleteAll(path?: string, domain?: string, secure?: boolean, sameSite: 'Lax' | 'None' | 'Strict' = 'Lax'): void {
    const cookies: any = this.getAll();

    for (const cookieName in cookies) {
      if (cookies.hasOwnProperty(cookieName)) {
        this.delete(cookieName, path, domain, secure, sameSite);
      }
    }
  }
}

const cookie = new CookieService();
export default cookie;
